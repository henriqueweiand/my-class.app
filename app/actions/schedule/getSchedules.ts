import prisma from "@/app/libs/prismadb";
import dayjs from "dayjs";

interface getSchedulesProps {
  shift?: string
  day?: string
}

export default async function getSchedules({ shift, day }: getSchedulesProps) {
  try {
    let query: any = {};

    if (!!shift && shift !== 'null') {
      if (shift !== 'all') {
        query.shift = shift;
      }
    }

    if (!!day && day !== 'null') {
      if (day !== 'all') {
        query.day = day;
      }
    }

    const schedules = await prisma.schedule.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        teacher: true,
        student: true
      }
    });

    const safeSchedule = schedules.map(
      (schedule) => ({
        ...schedule,
        teacher: {
          name: schedule.teacher.name || '',
        },
        students: schedule.student,
        createdAt: schedule.createdAt.toISOString(),
        startDate: dayjs(schedule.startDate).format('YYYY-MM-DD HH:mm'),
        endDate: schedule.endDate.toISOString(),
      }));

    return safeSchedule;
  } catch (error: any) {
    throw new Error(error);
  }
}
