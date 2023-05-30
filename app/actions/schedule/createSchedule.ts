import prisma from "@/app/libs/prismadb";

export type createScheduleProps = {
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    category: string,
    classLength: number,
    timezone: string,
    day: string,
    shift: string,
    eventId: string,
    userId: string,
}

export async function createSchedule(data: createScheduleProps) {
    const schedule = await prisma.schedule.create({ data });

    if (!schedule) {
        return false;
    }

    return schedule;
}
