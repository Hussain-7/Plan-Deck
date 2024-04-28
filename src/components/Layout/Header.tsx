import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import Avatar from "react-avatar";
import Suggestion from "../Suggestion";
import { useBoardStore } from "@/store/BoardStore";
import debounce from "lodash.debounce";
import useSWR from "swr";
import { fetchSuggestion } from "@/lib/helpers";
import SearchForm from "../common/SearchForm";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import UserAccountNav from "../common/UserAccountNav";

type Props = {
  user: KindeUser | null;
};

const Header = ({ user }: Props) => {
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
        {user && (
          <div className="flex items-center space-x-5 flex-1 justify-end w-full">
            <SearchForm />
            <UserAccountNav
              name={
                !user.given_name || !user.family_name
                  ? "Your Account"
                  : `${user.given_name} ${user.family_name}`
              }
              email={user.email ?? ""}
              imageUrl={user.picture ?? ""}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
