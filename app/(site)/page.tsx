import ClientOnly from "@/app/components/ClientOnly";
import SiteClient from "./SiteClient";

interface SitePage {
};

const SitePage = async ({ }: SitePage) => {
  return (
    <ClientOnly>
      <SiteClient />
    </ClientOnly>
  );
};

export default SitePage;
