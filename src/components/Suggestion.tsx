import { UserCircleIcon } from "@heroicons/react/16/solid";
import React from "react";

type Props = {
  suggestion: string;
  loading: boolean;
};

const Suggestion = ({ suggestion, loading }: Props) => {
  // Add Logic For Gpt recommendations later
  // Bonus
  return (
    <div className="flex items-center justify-center px-5 py-2 md:py-5">
      <p
        className="flex items-center text-sm font-semibold italic pr-5 shadow-xl rounded-xl w-fit 
			bg-white max-w-3xl text-[#2455c4] p-2 md:p-4"
      >
        <UserCircleIcon
          className={`inline-block h-10 w-10 text-[#2455c4] mr-2
          ${loading ? "animate-spin" : ""}
          `}
        />
        {suggestion && !loading
          ? suggestion
          : "GPT is summarising your tasks for the day..."}
      </p>
    </div>
  );
};

export default Suggestion;
