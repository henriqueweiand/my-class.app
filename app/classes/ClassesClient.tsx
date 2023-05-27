'use client';

import { SafeSchedule } from "@/app/types";
import Container from "../components/Container";
import { useRouter } from "next/navigation";
import ScheduleCard from "../components/cards/ScheduleCard";

interface ClassesClientProps {
  classes?: SafeSchedule[];
}

const ClassesClient: React.FC<ClassesClientProps> = ({
  classes
}) => {

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          classes && classes.map((classe) => <ScheduleCard href={`/classes/${classe.id}`} key={classe.id} {...classe} />)
        }
      </div>
    </Container>
  );
}

export default ClassesClient;