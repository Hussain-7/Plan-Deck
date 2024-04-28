"use client";
import { useBoardStore } from "@/store/BoardStore";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import debounce from "lodash.debounce";
import React, { useCallback, useState } from "react";

type Props = {};

const SearchForm = (props: Props) => {
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

  return (
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
        className="flex-1 outline-none p-1 md:p-2 max-w-[120px] sm:max-w-full"
        value={value}
        onChange={handleChange}
      />
      <button hidden type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
