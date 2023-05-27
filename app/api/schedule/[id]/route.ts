import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { getGoogleOAuthToken } from "@/app/actions/google/getGoogleOAuthToken";
import { google } from "googleapis";
import getSchedule from "@/app/actions/getSchedule";
import prisma from "@/app/libs/prismadb";

interface IParams {
  id: string;
}

export async function PUT(
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

    const calendar = google.calendar({
      version: 'v3',
      auth: await getGoogleOAuthToken(schedule.userId),
    })

    const event = await calendar.events.get({
      calendarId: 'primary',
      eventId: schedule.eventId,
    });

    console.log(event.data.status);

    // const existingAttendees = event.data.attendees || [];
    // const newAttendees = [
    //   { email: currentUser.email },
    // ];

    // const updatedAttendees = existingAttendees.concat(newAttendees);

    // event.data.attendees = updatedAttendees;

    // const updatedCallendar = await calendar.events.patch({
    //   calendarId: 'primary',
    //   conferenceDataVersion: 1,
    //   eventId: schedule.eventId,
    //   sendUpdates: 'none',
    //   requestBody: event.data,
    // })

    // await prisma.student.create({
    //   data: {
    //     userId: currentUser.id,
    //     scheduleId: schedule.idhttps://www.youtube.com/watch?v=5IfuDxHEWr8
    //   }
    // });

    // return NextResponse.json(updatedCallendar);
    return NextResponse.json({});
  } catch (error) {
    throw new Error();
  }
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

    const calendar = google.calendar({
      version: 'v3',
      auth: await getGoogleOAuthToken(currentUser.id),
    })

    const updatedCallendar = await calendar.events.delete({
      calendarId: 'primary',
      eventId: schedule.eventId,
    })

    await prisma.student.deleteMany({
      where: {
        userId: currentUser.id,
        scheduleId: schedule.id
      }
    });

    return NextResponse.json(updatedCallendar);
  } catch (error) {
    throw new Error();
  }
}