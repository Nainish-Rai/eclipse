"use client";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

function ProfilePage({}: Props) {
  const { data } = useSession();
  console.log(data);
  return <div>ProfilePage</div>;
}

export default ProfilePage;
