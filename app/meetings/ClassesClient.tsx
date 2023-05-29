"use client";

import { SafeSchedule } from "@/app/types";
import Container from "../components/Container";
import ScheduleCard from "../components/cards/ScheduleCard";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "../components/inputs/Search";

interface ClassesClientProps {
  classes?: SafeSchedule[];
}

const ClassesClient: React.FC<ClassesClientProps> = ({ classes }) => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  return (
    <Container>
      <div className="card w-full shadow-xl mt-2 mb-12">
        <div className="card-body">
          <SearchInput />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes &&
          classes.map((classe) => (
            <ScheduleCard
              href={`/meetings/${classe.id}`}
              key={classe.id}
              {...classe}
            />
          ))}
      </div>
    </Container>
  );
};

export default ClassesClient;
