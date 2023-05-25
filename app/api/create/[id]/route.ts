import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { getGoogleOAuthToken } from "@/app/actions/getGoogleOAuthToken";
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

    const updatedCallendar = await calendar.events.patch({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      eventId: schedule.eventId,
      requestBody: {
        attendees: [
          // ...schedule.Student,
          { email: currentUser.email }
        ],
      },
    })

    await prisma.student.create({
      data: {
        userId: currentUser.id,
        classesId: schedule.id
      }
    });

    return NextResponse.json(updatedCallendar);
  } catch (error) {
    throw new Error();
  }

}
