import prisma from "@/app/libs/prismadb";

interface deleteScheduleProps {
  eventId: string;
}

export async function deleteSchedule({ eventId }: deleteScheduleProps) {
  try {

    const schedule = await prisma.schedule.deleteMany({
      where: {
        eventId,
      },
    });

    if (!schedule) {
      return false;
    }

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}
