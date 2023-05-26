import { Schedule, Student, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeSchedule = Omit<
  Schedule,
  "createdAt" | "startDate" | "endDate"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  teacher: {
    name: string;
  }
  students: Student[]
};