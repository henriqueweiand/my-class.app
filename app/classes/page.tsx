
import ClientOnly from "@/app/components/ClientOnly";
import getClasses from "../actions/getClasses";
import getCurrentUser from "../actions/getCurrentUser";
import { SafeClasses } from "../types";
import ClassesClient from "./ClassesClient";

const CreatePage = async () => {
  const currentUser = await getCurrentUser();
  const classes = await getClasses();

  if (!currentUser) {
    return (
      <ClientOnly>
        Unauthorized, make login
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ClassesClient classes={classes} currentUser={currentUser} />
    </ClientOnly>
  );
}

export default CreatePage;
