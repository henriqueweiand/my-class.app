import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { getGoogleOAuthToken } from "@/app/actions/getGoogleOAuthToken";
import { google } from "googleapis";
import getSchedule from "@/app/actions/getSchedule";

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

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(schedule.userId), // 646c0343fe04c0e92b2b6447
  })

  const updatedCallendar = await calendar.events.patch({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    eventId: schedule.eventId,
    requestBody: {
      attendees: [
        // ...schedule.students,
        { email: currentUser.email }
      ],
    },
  })

  return NextResponse.json(updatedCallendar);
  // return NextResponse.json({});
}
