"use client";
import Image from "next/image";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center gap-2">
      <Image
        src="/logo-2.png"
        alt="logo"
        width={633}
        height={104}
        className="w-48 md:w-60 pb-5 md:pb-0 object-contain"
      />
      <button
        onClick={() => {}}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign In to use
      </button>
    </div>
  );
};

export default page;
