import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { SafeSchedule, SafeUser } from "@/app/types";

interface IUseEnroll {
  schedule: SafeSchedule;
  currentUser: SafeUser;
}

const useEnroll = ({ schedule, currentUser }: IUseEnroll) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isStudent = () => !!schedule.students.find((student) => student.userId === currentUser.id);

  const toggleEnroll = useCallback(async () => {
    try {
      setIsLoading(true);
      let request;

      if (isStudent()) {
        request = () => axios.delete(`/api/schedule/${schedule.id}`);
      } else {
        request = () => axios.put(`/api/schedule/${schedule.id}`);
      }

      await request().finally(() => {
        setIsLoading(false);
      });
      router.refresh();
      toast.success('Success');
    } catch (error) {
      setIsLoading(false);
      toast.error('Something went wrong.');
    }
  },
    [
      isStudent,
      schedule,
      router
    ]);

  return {
    toggleEnroll,
    isLoading
  }
}

export default useEnroll;
