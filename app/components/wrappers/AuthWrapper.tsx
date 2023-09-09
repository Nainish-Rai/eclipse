"use client"
import React from "react";
import { Navbar } from "..";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface WrapperProps {
    children: React.ReactNode
}

export default function AuthWrapper({ children }: WrapperProps) {
    const router = useRouter();
    const { isLoaded, isSignedIn, user } = useUser();
    React.useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/");
        }
    }, [isLoaded, isSignedIn, router]);

    return (
        <>
            <Navbar user={user!} />
            {children}
        </>
    )
}
