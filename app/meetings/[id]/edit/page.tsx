
import ClientOnly from "@/app/components/ClientOnly";
import EditClient from "./EditClient";
import getCurrentUser from "@/app/actions/user/getCurrentUser";
import getSchedule from "@/app/actions/schedule/getSchedule";

interface IParams {
  id: string;
}

const EditPage = async ({ params }: { params: IParams }) => {
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
      <EditClient currentUser={currentUser} schedule={schedule} />
    </ClientOnly>
  );
}

export default EditPage;
