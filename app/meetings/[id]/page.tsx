
import getCurrentUser from "@/app/actions/user/getCurrentUser";
import getSchedule from "@/app/actions/schedule/getSchedule";
import ClientOnly from "@/app/components/ClientOnly";
import MeetingClient from "./MeetingClient";

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
        schedule && <MeetingClient currentUser={currentUser} schedule={schedule} />
      }
    </ClientOnly>
  );
}

export default CreatePage;
