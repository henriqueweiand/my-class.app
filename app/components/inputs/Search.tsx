"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface InputProps {}

const SearchInput: React.FC<InputProps> = ({}) => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/meetings?q=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch} className="form-control w-full">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered w-full"
          value={searchQuery || ""}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
