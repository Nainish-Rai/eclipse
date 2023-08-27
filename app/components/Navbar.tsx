import Image from "next/image";
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
import { Session } from "next-auth";

type Props = {
  isSignedIn?: Session;
};

function Navbar({ isSignedIn }: Props) {
  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn("google");
  };
  return (
    <nav className="w-full flex items-center justify-between p-2">
      <h1 className=" text-2xl">Eclipse</h1>
      <div className="hidden md:flex">
        <ul className="flex  bg-neutral-900/60  backdrop-blur rounded-full px-6 p-2 space-x-12">
          <li className="cursor-pointer hover:text-pink-600 duration-150">
            Home
          </li>
          <li className="cursor-pointer hover:text-pink-600 duration-150">
            Studio
          </li>
          <li className="cursor-pointer hover:text-pink-600 duration-150">
            MarketPlace
          </li>
        </ul>
      </div>
      <div>
        {/* right side */}
        <div className="flex space-x-2">
          <div className="flex items-center bg-neutral-900/60 backdrop-blur rounded-full ">
            {isSignedIn ? (
              <div className="flex items-center px-4 p-2 space-x-2">
                <div className="relative w-7 aspect-square">
                  {isSignedIn?.user?.image && (
                    <Image
                      src={isSignedIn?.user?.image}
                      alt="pfp"
                      fill
                      className="rounded-full"
                    />
                  )}
                </div>
                <h3>{isSignedIn?.user?.name}</h3>
              </div>
            ) : (
              <div
                className="px-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-black cursor-pointer hover:text-pink-600"
                onClick={handleSignIn}
              >
                Sign in
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" hover:text-pink-600 duration-150 bg-neutral-900/60 backdrop-blur rounded-full aspect-square px-3 outline-none">
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 lg:mr-24 mr-2 rounded-xl p-2  bg-neutral-900/50">
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
