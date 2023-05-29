import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/user/getCurrentUser";
import { createAgenda } from "@/app/actions/google/createAgenda";
import { getGoogleOAuthToken } from "@/app/actions/google/getGoogleOAuthToken";
import prisma from "@/app/libs/prismadb";

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

  await prisma.schedule.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      category,
      classLength,
      timezone,
      eventId: event.data.id as string,
      userId: currentUser.id,
    },
  });

  return NextResponse.json({});
}
