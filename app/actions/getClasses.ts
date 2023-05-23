import prisma from "@/app/libs/prismadb";

interface IParams { }

export default async function getClasses(
) {
  try {
    const classes = await prisma.classes.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeClasses = classes.map(
      (classe) => ({
        ...classe,
        createdAt: classe.createdAt.toISOString(),
        startDate: classe.startDate.toISOString(),
        endDate: classe.endDate.toISOString(),
      }));

    return safeClasses;
  } catch (error: any) {
    throw new Error(error);
  }
}
