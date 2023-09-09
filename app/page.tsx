"use client"
import React from "react";
import { CreateAccount } from "./components/create-account";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const {isSignedIn} = useUser();

  React.useEffect(() => {
    console.log(isSignedIn)
    if (isSignedIn) {
      window.location.replace("/studio")
    }
  },[isSignedIn])

  return (
    <main className=" animate-ltr-linear-infinite bg-repeat flex justify-center items-center  h-screen bg-black bg-[url('../public/hero.png')]">
      <CreateAccount />
    </main>
  );
}
