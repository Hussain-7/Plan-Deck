"use client";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import React from "react";
import Avatar from "react-avatar";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <Image
          src="/logo-final.png"
          alt="logo"
          width={633}
          height={104}
          className="w-48 md:w-60 pb-5 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form
            action=""
            className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-1 md:p-2"
            />
            <button hidden type="submit">
              Search
            </button>
          </form>
          <Avatar name="Hussain Rizvi" round color="#338fdd" size="50" />
        </div>
      </div>
    </header>
  );
};

export default Header;
