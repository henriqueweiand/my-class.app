'use client';

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import useEnroll from "@/app/hooks/useEnroll";
import { SafeSchedule, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface ClassesClientProps {
  currentUser: SafeUser,
  schedule: SafeSchedule;
}

const ClassClient: React.FC<ClassesClientProps> = ({ schedule, currentUser }) => {
  const { isLoading, toggleEnroll } = useEnroll({ schedule, currentUser });
  const router = useRouter();

  const isStudent = () => !!schedule.students.find((student) => student.userId === currentUser.id);
  const isFull = () => schedule.students.length >= schedule.classLength;

  return (
    <Container>
      <article className="prose mt-10 mx-auto">
        <h1 className="my-2">{schedule.title}</h1>
        <p className="my-0">Starts at <time dateTime={schedule.startDate}>{schedule.startDate}</time> by {schedule.teacher.name}</p>

        <section className="my-6">
          <h3>About the meeting</h3>
          <p>{schedule.description}</p>
          <p>* All meetings have up to 1 hour in duration.</p>
        </section>

        <div className="alert">
          <div className="hidden md:block" />
          <div className="flex-none">
            {currentUser.id === schedule.userId ? (
              <>
                <Button disabled={isLoading} label="Edit class" onClick={() => router.push(`/classes/${schedule.id}/edit`)} />
              </>
            ) : (
              <>
                {
                  isStudent() ? (
                    <Button disabled={isLoading} label="Cancel your enrollment" onClick={() => toggleEnroll()} />
                  ) : (
                    <>
                      {
                        isFull() ? (
                          <p>This meeting is full</p>
                        ) : (
                          <Button disabled={isLoading} label="Enroll the meeting" onClick={() => toggleEnroll()} />
                        )
                      }
                    </>
                  )
                }
              </>
            )}
          </div>
        </div>
      </article>
    </Container>
  );
}

export default ClassClient;