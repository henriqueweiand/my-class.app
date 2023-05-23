import prisma from "@/app/libs/prismadb";

interface IParams {
  id?: string;
}

export default async function getSchedule(
  params: IParams
) {
  try {
    const { id } = params;

    const schedule = await prisma.classes.findUnique({
      where: {
        id,
      },
      include: {
        user: true
      }
    });

    if (!schedule) {
      return null;
    }

    const safeSchedule = {
      ...schedule,
      createdAt: schedule.createdAt.toISOString(),
      startDate: schedule.startDate.toISOString(),
      endDate: schedule.endDate.toISOString(),
    }

    return safeSchedule;
  } catch (error: any) {
    throw new Error(error);
  }
}
