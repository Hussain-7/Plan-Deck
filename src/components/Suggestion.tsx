import { UserCircleIcon } from "@heroicons/react/16/solid";
import React from "react";

type Props = {};

const Suggestion = (props: Props) => {
  // Add Logic For Gpt recommendations later
  // Bonus
  return (
    <div className="flex items-center justify-center px-5 py-2 md:py-5">
      <p
        className="flex items-center text-sm font-normal italic pr-5 shadow-xl rounded-xl w-fit 
			bg-white max-w-3xl text-[#338fdd] p-2 md:p-4"
      >
        <UserCircleIcon className="inline-block h-10 w-10 text-[#338fdd] mr-1" />
        GPT is summarising your tasks for the day...
      </p>
    </div>
  );
};

export default Suggestion;
