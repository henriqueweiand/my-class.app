'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import DatePicker from "../components/inputs/Calendar";
import Counter from "../components/inputs/Counter";
import Input from "../components/inputs/Input";
import TimeSelect from "../components/inputs/TimeSelect";
import { TimeSelectValue } from "../components/inputs/TimeSelect";
import dayjs from "dayjs";

interface ReservationsClientProps {
  currentUser?: SafeUser | null,
}

const CreateClient: React.FC<ReservationsClientProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const [StudentCount, setStudentCount] = useState(1);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<TimeSelectValue>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!date) {
      toast.error('Inform a date');
      return;
    }

    if (!time) {
      toast.error('Inform a time');
      return;
    }

    setIsLoading(true);

    const dateFormated = date;
    const schedulingDate = dayjs(dateFormated).set('hour', time.value);

    axios.post(`/api/schedule`, {
      title: data.title,
      description: data.description,
      category: data.category,
      classLength: StudentCount,
      timezone: 'UTF-8',
      startDate: schedulingDate.format(),
      endDate: schedulingDate.add(1, 'hour').format(),
    })
      .then((data) => {
        toast.success('Callendar created');
        router.push('/meetings');
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
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
  )

  const cardFooter = (
    <Button
      loading={isLoading}
      label="Create"
      onClick={handleSubmit(onSubmit)}
    />
  )

  return (
    <div className="card mt-4 max-w-lg mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create a room!</h2>
        {cardBody}

        <div className="card-actions justify-end">
          {cardFooter}
        </div>
      </div>
    </div>
  )
}

export default CreateClient;