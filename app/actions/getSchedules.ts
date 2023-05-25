import prisma from "@/app/libs/prismadb";

interface IParams { }

export default async function getSchedules(
) {
  try {
    const schedules = await prisma.schedule.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeSchedule = schedules.map(
      (schedule) => ({
        ...schedule,
        createdAt: schedule.createdAt.toISOString(),
        startDate: schedule.startDate.toISOString(),
        endDate: schedule.endDate.toISOString(),
      }));

    return safeSchedule;
  } catch (error: any) {
    throw new Error(error);
  }
}
