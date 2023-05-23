'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";
import Button from "../components/Button";


interface ReservationsClientProps {
  currentUser?: SafeUser | null,
}

const CreateClient: React.FC<ReservationsClientProps> = ({
  currentUser
}) => {
  const [eventId, setEventId] = useState<string>();
  const router = useRouter();

  const onCreate = useCallback(() => {
    axios.post(`/api/create`, {
      title: 'meet test',
      description: 'this is a test meeting',
      category: 'education',
      classLength: 6,
      timezone: 'UTF-8',
      startDate: '2023-05-24T12:46:00.000Z',
      endDate: '2023-05-24T16:46:06.055Z'
    })
      .then((data) => {
        console.log(data.data.eventId);
        setEventId(data.data.eventId as string);
        toast.success('Callendar created');
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  }, [router]);

  const onUpdate = useCallback(() => {
    axios.put(`/api/create/${eventId}`, {
    })
      .then(() => {
        toast.success('Callendar update');
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  }, [router, eventId]);

  return (
    <>
      <Button
        label="Create"
        onClick={() => onCreate()}
      />
      <Button
        label="update"
        onClick={() => onUpdate()}
      />
    </>
  );
}

export default CreateClient;