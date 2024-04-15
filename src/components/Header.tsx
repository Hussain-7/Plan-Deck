"use client";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import Avatar from "react-avatar";
import Suggestion from "./Suggestion";
import { useBoardStore } from "@/store/BoardStore";
import debounce from "lodash.debounce";
import useSWR from "swr";
import { fetchSuggestion } from "@/lib/helpers";

type Props = {};

const Header = (props: Props) => {
  const [value, setValue] = useState("");

  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const debouncedSave = useCallback(
    debounce((nextValue: string) => {
      console.log("Debounced:", nextValue);
      setSearchString(nextValue);
    }, 500),
    []
  ); // 500ms before searching

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target;
    setValue(nextValue);
    debouncedSave(nextValue);
  };

  const {
    data: suggestion,
    error,
    isLoading,
  } = useSWR(
    board.columns.size !== 0 ? "/api/generateSummary" : null,
    async () => {
      const response = await fetchSuggestion(board);
      return response;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log("data", suggestion);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#2455c4] rounded-md filter blur-3xl opacity-50 -z-50" />
        <Image
          src="/logo-2.png"
          alt="logo"
          width={633}
          height={104}
          className="w-48 md:w-60 pb-5 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-1 md:p-2"
              value={value}
              onChange={handleChange}
            />
            <button hidden type="submit">
              Search
            </button>
          </form>
          <Avatar name="Hussain Rizvi" round color="#2455c4" size="50" />
        </div>
      </div>
      <Suggestion suggestion={suggestion} loading={isLoading} />
    </header>
  );
};

export default Header;
