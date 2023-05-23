'use client';

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { SafeClasses, SafeUser } from "@/app/types";
import axios from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface ClassesClientProps {
  currentUser: SafeUser,
  schedule: SafeClasses;
}

const ClassClient: React.FC<ClassesClientProps> = ({ schedule }) => {
  const onUpdate = useCallback(() => {
    axios.put(`/api/create/${schedule.id}`, {})
      .then(() => {
        toast.success('Enrolled');
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  }, [schedule]);

  return (
    <Container>
      {
        JSON.stringify(schedule)
      }

      <Button
        label="Enroll"
        onClick={() => onUpdate()}
      />
    </Container>
  );
}

export default ClassClient;