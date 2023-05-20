
import ClientOnly from "@/app/components/ClientOnly";

const MyClassesPage = async () => {
  return (
    <ClientOnly>
      MyClasses
    </ClientOnly>
  );
}

export default MyClassesPage;
