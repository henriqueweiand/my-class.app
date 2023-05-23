
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import CreateClient from "./CreateClient";

const CreatePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        Unauthorized, make login
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <CreateClient currentUser={currentUser} />
    </ClientOnly>
  );
}

export default CreatePage;
