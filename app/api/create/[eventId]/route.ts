import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { getGoogleOAuthToken } from "@/app/actions/getGoogleOAuthToken";
import { google } from "googleapis";

interface IParams {
  eventId?: string;
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { eventId } = params;

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(currentUser.id), // it must be the id of the owner
  })

  const updatedCallendar = await calendar.events.patch({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    eventId: eventId,
    requestBody: {
      attendees: [{ email: 'henrique.weiand@rockcontent.com' }], // add all emails
    },
  })

  // const classroom = await prisma.classes.create({
  //   data: {
  //     title,
  //     description,
  //     startDate,
  //     endDate,
  //     category,
  //     classLength,
  //     timezone,
  //     userId: currentUser.id
  //   }
  // });

  return NextResponse.json(updatedCallendar);
}
