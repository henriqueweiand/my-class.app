
import ClientOnly from "@/app/components/ClientOnly";
import getSchedules from "../actions/getSchedules";
import getCurrentUser from "../actions/getCurrentUser";
import ClassesClient from "./ClassesClient";

const CreatePage = async () => {
  const currentUser = await getCurrentUser();
  const classes = await getSchedules();

  if (!currentUser) {
    return (
      <ClientOnly>
        Unauthorized, make login
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ClassesClient classes={classes} />
    </ClientOnly>
  );
}

export default CreatePage;
