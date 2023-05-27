
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSchedule from "@/app/actions/getSchedule";
import ClientOnly from "@/app/components/ClientOnly";
import ClassClient from "./ClassClient";

interface IParams {
  id?: string;
}

const CreatePage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const schedule = await getSchedule(params);

  if (!currentUser) {
    return (
      <ClientOnly>
        Unauthorized, make login
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      {
        schedule && <ClassClient currentUser={currentUser} schedule={schedule} />
      }
    </ClientOnly>
  );
}

export default CreatePage;
