import { NextResponse } from "next/server";

import { createAgenda } from "@/app/actions/google/createAgenda";
import { getGoogleOAuthToken } from "@/app/actions/google/getGoogleOAuthToken";
import { createSchedule } from "@/app/actions/schedule/createSchedule";
import getCurrentUser from "@/app/actions/user/getCurrentUser";
import { shiftNameByValue } from "@/app/actions/schedule/utils";
import dayjs from "dayjs";

export async function POST(request: Request) {
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
    endDate,
    time
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const { event } = await createAgenda({
    eventData: {
      title,
      description: description,
      startDate,
      endDate,
    },
    googleUserAuth: await getGoogleOAuthToken(currentUser.id),
  });

  if (!event) {
    return NextResponse.error();
  }

  await createSchedule({
    title,
    description,
    startDate,
    endDate,
    category,
    classLength,
    timezone,
    day: dayjs(startDate).format('dddd').toLocaleLowerCase(),
    shift: shiftNameByValue(time),
    eventId: event.data.id as string,
    userId: currentUser.id,
  })

  return NextResponse.json({});
}
