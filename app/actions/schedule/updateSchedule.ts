import prisma from "@/app/libs/prismadb";

export type updateScheduleProps = {
    id: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    category: string,
    classLength: number,
    timezone: string,
    day: string,
    shift: string,
}

export async function updateSchedule({ id, ...data }: updateScheduleProps) {
    const schedule = await prisma.schedule.update({
        where: {
            id,
        },
        data
    });

    if (!schedule) {
        return false;
    }

    return schedule;
}
