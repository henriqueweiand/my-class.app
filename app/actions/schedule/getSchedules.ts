import prisma from "@/app/libs/prismadb";
import dayjs from "dayjs";

interface IParams { }

export default async function getSchedules(
) {
  try {
    const schedules = await prisma.schedule.findMany({
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
