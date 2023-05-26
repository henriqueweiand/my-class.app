import prisma from "@/app/libs/prismadb";
import dayjs from "dayjs";

interface IParams {
  id?: string;
}

export default async function getSchedule(
  params: IParams
) {
  try {
    const { id } = params;

    const schedule = await prisma.schedule.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
        student: true
      }
    });

    if (!schedule) {
      return null;
    }

    const safeSchedule = {
      ...schedule,
      teacher: {
        name: schedule.teacher.name,
      },
      students: schedule.student,
      createdAt: schedule.createdAt.toISOString(),
      startDate: dayjs(schedule.startDate).format('YYYY-MM-DD HH:mm'),
      endDate: schedule.endDate.toISOString(),
    }

    return safeSchedule;
  } catch (error: any) {
    throw new Error(error);
  }
}
