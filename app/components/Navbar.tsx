"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { signOut, signIn } from "next-auth/react";
import Link from "next/link";


function Navbar() {
  const { data: session } = useSession();
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [router, session]);
  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn("google");
  };
  return (
    <nav className="w-full  h-[8%] flex items-center justify-between p-2">
      <h1 className=" text-lg  bg-neutral-900/60 border  backdrop-blur rounded-full  px-6 p-2 ">
        Eclipse
      </h1>
      <div className="hidden md:flex">
        <ul className="flex  bg-neutral-900/60 border  backdrop-blur rounded-full px-6 p-2 space-x-12">
          <Link href="/" className="cursor-pointer hover:text-pink-600 duration-150">
            Home
          </Link>
          <Link href="/studio" className="cursor-pointer hover:text-pink-600 duration-150">
            Studio
          </Link>
          <Link href="/expore" className="cursor-pointer hover:text-pink-600 duration-150">
            Explore
          </Link>
        </ul>
      </div>
      <div>
        {/* right side */}
        <div className="flex space-x-2">
          <div className="flex items-center border bg-neutral-900/60 backdrop-blur rounded-full ">
            {session ? (
              <div className="flex items-center px-4 p-2 space-x-2">
                <div className="relative w-7 aspect-square">
                  {session?.user?.image && (
                    <Image
                      src={session?.user?.image}
                      alt="pfp"
                      fill
                      className="rounded-full"
                    />
                  )}
                </div>
                <h3>{session?.user?.name}</h3>
              </div>
            ) : (
              <div
                className="px-4 p-2 bg-white/80 border backdrop-blur-sm rounded-full text-black cursor-pointer hover:text-pink-600"
                onClick={handleSignIn}
              >
                Sign in
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" hover:text-pink-600 duration-150 border bg-neutral-900/60 backdrop-blur rounded-full aspect-square px-3 outline-none">
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 lg:mr-14  mr-2 rounded-xl p-2  bg-neutral-900/50">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Team
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
