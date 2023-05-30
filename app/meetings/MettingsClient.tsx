"use client";

import { SafeSchedule } from "@/app/types";
import Container from "../components/Container";
import ScheduleCard from "../components/cards/ScheduleCard";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Shift from "../components/select/Shift";
import Days from "../components/select/Days";
import Button from "../components/Button";
import { useRouter, useSearchParams } from "next/navigation";

interface MettingsClientProps {
  schedules?: SafeSchedule[];
}

const MettingsClient: React.FC<MettingsClientProps> = ({ schedules }) => {
  const search = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      shift: search ? search.get("shift") : "all",
      day: search ? search.get("day") : "all",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    router.push(`/meetings?shift=${data.shift}&day=${data.day}`);
  }

  return (
    <Container>
      <div className="card w-full shadow-xl mt-2 mb-12">
        <div className="card-body grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 justify-center items-center">
          <Shift
            id="shift"
            disabled={false}
            register={register}
            errors={errors}
          />

          <Days
            id="day"
            disabled={false}
            register={register}
            errors={errors}
          />

          <Button onClick={handleSubmit(onSubmit)} label="Search" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedules &&
          schedules.map((schedule) => (
            <ScheduleCard
              href={`/meetings/${schedule.id}`}
              key={schedule.id}
              {...schedule}
            />
          ))}
      </div>
    </Container>
  );
};

export default MettingsClient;
