import { getGoogleOAuthToken } from "@/app/actions/google/getGoogleOAuthToken";
import { updateAgenda } from "@/app/actions/google/updateAgenda";
import getSchedule from "@/app/actions/schedule/getSchedule";
import getCurrentUser from "@/app/actions/user/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  id: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { id } = params;

  const currentUser = await getCurrentUser();
  const schedule = await getSchedule({ id });

  if (!currentUser || currentUser === null || !schedule || schedule === null) {
    return NextResponse.error();
  }

  if (currentUser.id !== schedule?.userId) {
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

  const { event } = await updateAgenda({
    eventId: schedule?.eventId,
    eventData: {
      description: description,
      start: {
        dateTime: startDate,
      },
      end: {
        dateTime: endDate,
      },
    },
    googleUserAuth: await getGoogleOAuthToken(currentUser.id),
  });

  if (!event) {
    return NextResponse.error();
  }

  await prisma.schedule.update({
    where: {
      id: schedule.id,
    },
    data: {
      title,
      description,
      startDate,
      endDate,
      category,
      classLength,
      timezone,
    },
  });

  return NextResponse.json({
    status: 200,
  });
}
