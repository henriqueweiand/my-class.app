import ClientOnly from "@/app/components/ClientOnly";
import getSchedules from "../actions/schedule/getSchedules";
import getCurrentUser from "../actions/user/getCurrentUser";
import ClassesClient from "./MettingsClient";

interface MeetingsPage {
  searchParams: {
    shift?: string;
    day?: string;
  }
};

const MeetingsPage = async ({ searchParams }: MeetingsPage) => {
  const currentUser = await getCurrentUser();
  const schedules = await getSchedules(searchParams);

  if (!currentUser) {
    return <ClientOnly>Unauthorized, make login</ClientOnly>;
  }

  return (
    <ClientOnly>
      <ClassesClient schedules={schedules} />
    </ClientOnly>
  );
};

export default MeetingsPage;
