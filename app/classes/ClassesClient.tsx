'use client';

import { SafeClasses, SafeUser } from "@/app/types";
import Container from "../components/Container";
import CardClass from "../components/cardClass/CardClass";
import { useRouter } from "next/navigation";

interface ClassesClientProps {
  classes?: SafeClasses[];
}

const ClassesClient: React.FC<ClassesClientProps> = ({
  classes
}) => {
  const router = useRouter();

  const onClick = (id: string) => router.push(`/classes/${id}`)

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          classes && classes.map((classe) => <CardClass onClick={onClick} key={classe.id} {...classe} />)
        }
      </div>
    </Container>
  );
}

export default ClassesClient;