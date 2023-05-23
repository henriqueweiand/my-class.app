'use client';

import { SafeClasses, SafeUser } from "@/app/types";
import Container from "../components/Container";
import CardClass from "../components/cardClass/CardClass";

interface ClassesClientProps {
  currentUser?: SafeUser | null,
  classes?: SafeClasses[];
}

const ClassesClient: React.FC<ClassesClientProps> = ({
  currentUser,
  classes
}) => {
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          classes && classes.map((classe) => <CardClass key={classe.id} {...classe} />)
        }
      </div>
    </Container>
  );
}

export default ClassesClient;