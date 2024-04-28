"use client";
import { fetchSuggestion } from "@/lib/helpers";
import { useBoardStore } from "@/store/BoardStore";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import React from "react";
import useSWR from "swr";

const Suggestion = () => {
  const [board] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const { data: suggestion, isLoading } = useSWR(
    board.columns.size !== 0 && process.env.NODE_ENV !== "development"
      ? "/api/generateSummary"
      : null,
    async () => {
      const response = await fetchSuggestion(board);
      return response;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div className="flex items-center justify-center px-5 py-2 md:py-5 mt-5">
      <p
        className="flex items-center text-sm font-semibold italic pr-5 shadow-xl rounded-xl w-fit 
			bg-white max-w-3xl text-[#2455c4] p-2 md:p-4"
      >
        <UserCircleIcon
          className={`min-h-6 min-w-6 h-10 w-10 text-[#2455c4] mr-2
          ${isLoading ? "animate-spin" : ""}
          `}
        />
        <div className="">
          {suggestion && !isLoading
            ? suggestion
            : "GPT is summarising your tasks for the day..."}
        </div>
      </p>
    </div>
  );
};

export default Suggestion;
