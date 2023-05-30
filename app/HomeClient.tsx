"use client";

import { useRouter } from "next/navigation";
import Loading from "./loading";

interface HomeClientProps { }

const HomeClient: React.FC<HomeClientProps> = ({ }) => {
  const router = useRouter();
  router.push('/meetings');

  return (
    <>
      <Loading />
    </>
  )
};

export default HomeClient;
