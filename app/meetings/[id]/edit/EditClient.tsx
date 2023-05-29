"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { SafeSchedule, SafeUser } from "@/app/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import dayjs from "dayjs";
import Button from "@/app/components/Button";
import DatePicker from "@/app/components/inputs/Calendar";
import Counter from "@/app/components/inputs/Counter";
import TimeSelect, {
  TimeSelectValue,
} from "@/app/components/inputs/TimeSelect";
import Input from "@/app/components/inputs/Input";

interface ReservationsClientProps {
  currentUser: SafeUser;
  schedule: SafeSchedule;
}

const EditClient: React.FC<ReservationsClientProps> = ({
  currentUser,
  schedule,
}) => {
  const dateTemp = dayjs(schedule.startDate);

  const getTimeSelectValue = (hours: number): TimeSelectValue => {
    const label = `${hours.toString().padStart(2, "0")}:00`;
    return {
      label,
      value: hours,
    };
  };

  const router = useRouter();
  const [StudentCount, setStudentCount] = useState(schedule.classLength);
  const [date, setDate] = useState<Date>(dateTemp.toDate());
  const [time, setTime] = useState<TimeSelectValue>(
    getTimeSelectValue(dateTemp.get("hour"))
  );
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: schedule.title,
      description: schedule.description,
      category: schedule.category,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!date) {
      toast.error("Inform a date");
      return;
    }

    if (!time) {
      toast.error("Inform a time");
      return;
    }

    setIsLoadingUpdate(true);

    const dateFormated = date;
    const schedulingDate = dayjs(dateFormated).set("hour", time.value);

    axios
      .put(`/api/schedule/${schedule.id}`, {
        title: data.title,
        description: data.description,
        category: data.category,
        classLength: StudentCount,
        timezone: "UTF-8",
        startDate: schedulingDate.format(),
        endDate: schedulingDate.add(1, "hour").format(),
      })
      .then((data) => {
        toast.success("Callendar updated");
        router.push("/meetings");
      })
      .catch(() => {
        toast.error("Something went wrong.");
        setIsLoadingUpdate(false);
      });
  };

  const handleDelete = () => {
    setIsLoadingDelete(true);

    axios
      .delete(`/api/schedule/${schedule.id}`)
      .then(() => {
        toast.success("Callendar deleted");
        router.push("/meetings");
      })
      .catch(() => {
        toast.error("Something went wrong.");
        setIsLoadingDelete(false);
      });
  };

  const cardBody = (
    <div className="w-full grid grid-cols-1 gap-4">
      <Input
        id="title"
        label="Title"
        type="text"
        disabled={false}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="description"
        label="Description"
        type="text"
        disabled={false}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="category"
        label="Category"
        type="text"
        disabled={false}
        register={register}
        errors={errors}
        required
      />

      <Counter
        onChange={setStudentCount}
        value={StudentCount}
        title="Student"
        subtitle="How many Student"
      />

      <TimeSelect
        value={time}
        label="Time"
        onChange={(value) => setTime(value)}
      />

      <DatePicker
        onChange={(selectedDate) => setDate(selectedDate)}
        value={date}
      />
    </div>
  );

  const cardFooter = (
    <>
      <Button
        loading={isLoadingDelete}
        label="Delete"
        onClick={() => handleDelete()}
      />

      <Button
        loading={isLoadingUpdate}
        label="Update"
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );

  return (
    <div className="card mt-4 max-w-lg mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create a room!</h2>
        {cardBody}

        <div className="card-actions justify-end">{cardFooter}</div>
      </div>
    </div>
  );
};

export default EditClient;
