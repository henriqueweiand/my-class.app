import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { google } from "googleapis";
import { getGoogleOAuthToken } from "@/app/actions/getGoogleOAuthToken";

export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    category,
    classLength,
    timezone,
    startDate,
    endDate
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(currentUser.id),
  })

  const createdEvent = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `meeting`,
      description: description,
      start: {
        dateTime: startDate,
      },
      end: {
        dateTime: endDate,
      },
      conferenceData: {
        createRequest: {
          requestId: '12312312312i',
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      guestsCanSeeOtherGuests: false,
      guestsCanModify: false,
    },
  })

  const classroom = await prisma.schedule.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      category,
      classLength,
      timezone,
      eventId: createdEvent.data.id as string,
      userId: currentUser.id
    }
  });

  return NextResponse.json(classroom);
}
