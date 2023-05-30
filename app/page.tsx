import HomeClient from "./HomeClient";
import getCurrentUser from "./actions/user/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import MainPage from "./components/site/Main";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <MainPage />;
  }

  return (
    <ClientOnly>
      <HomeClient />
    </ClientOnly>
  )
}
