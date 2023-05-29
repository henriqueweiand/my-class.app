import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/user/getCurrentUser";
import { getGoogleOAuthToken } from "@/app/actions/google/getGoogleOAuthToken";
import getSchedule from "@/app/actions/schedule/getSchedule";
import prisma from "@/app/libs/prismadb";
import { getAgenda } from "@/app/actions/google/getAgenda";
import { updateAgenda } from "@/app/actions/google/updateAgenda";
import { deleteAgenda } from "@/app/actions/google/deleteAgenda";
import { isAgendaExists } from "@/app/actions/google/checkAgendaExists";
import { deleteSchedule } from "@/app/actions/schedule/deleteSchedule";

interface IParams {
  id: string;
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {

  const { id } = params;
  const currentUser = await getCurrentUser();
  const schedule = await getSchedule({ id })

  if (!currentUser || !schedule) {
    return NextResponse.error();
  }

  const googleUserAuth = await getGoogleOAuthToken(schedule.userId);

  const event = await getAgenda({
    eventId: schedule.eventId,
    googleUserAuth: googleUserAuth,
  });

  const checkAgendaExists = await isAgendaExists({ event });

  if (!checkAgendaExists) {
    // This event was removed by owner, sorry for that... We are updating our meetings catalog and we are going to remove it
    await deleteSchedule({ eventId: schedule.eventId });
    return NextResponse.error();
  }

  const existingAttendees = event.data.attendees || [];
  const newAttendees = [
    { email: currentUser.email },
  ];

  event.data.attendees = existingAttendees.concat(newAttendees);

  const updateEvent = await updateAgenda({
    eventId: schedule.eventId,
    eventData: event.data,
    googleUserAuth: googleUserAuth,
  });

  if (!updateEvent.event) {
    return NextResponse.error();
  }

  await prisma.student.create({
    data: {
      userId: currentUser.id,
      scheduleId: schedule.id
    }
  });

  return NextResponse.json({
    status: 200,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {

  try {
    const { id } = params;
    const currentUser = await getCurrentUser();
    const schedule = await getSchedule({ id })

    if (!currentUser || !schedule) {
      return NextResponse.error();
    }

    const event = await deleteAgenda({
      eventId: schedule.eventId,
      googleUserAuth: await getGoogleOAuthToken(currentUser.id),
    });

    if (!event) {
      return NextResponse.error();
    }

    await prisma.student.deleteMany({
      where: {
        userId: currentUser.id,
        scheduleId: schedule.id
      }
    });

    return NextResponse.json({});
  } catch (error) {
    throw new Error();
  }
}