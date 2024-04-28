import Board from "@/components/Board";
import Header from "@/components/Layout/Header";
import Suggestion from "@/components/Suggestion";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("user", user);

  return (
    <main className="mb-10">
      <Header user={user} />
      {user ? (
        <>
          <Suggestion />
          <Board />
        </>
      ) : (
        <div className="w-full flex items-center justify-center  h-[calc(100vh-134px)] md:h-[calc(100vh-124px)]">
          <div className="mx-4 w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow-lg ">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="text-gray-500 dark:text-gray-400">
                To use PlanDeck
              </p>
            </div>
            <LoginLink
              className="
                h-[52px]
                flex
                items-center
                justify-start
                bg-[#4285f4]
                text-white
                font-bold
                text-lg
                rounded-sm
                cursor-pointer
                hover:bg-[#4a7bcac0]
                p-[2px]"
            >
              <div className="w-12 h-full bg-white items-center justify-center flex">
                {" "}
                <Image
                  src={"/googleicon.webp"}
                  height={45}
                  width={45}
                  alt="Google Icon"
                />
              </div>
              <div className="flex items-center justify-center flex-1 font-semibold text-lg">
                {" "}
                Login in with Google
              </div>
            </LoginLink>
          </div>
        </div>
      )}
    </main>
  );
}
