"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
export function CreateAccount() {

  return (
    <SignIn
      redirectUrl="/studio"
      appearance={{
        baseTheme: dark,
        elements: {
          card: "shadow-lg backdrop-blur-sm bg-black/60 shadow-black/40 w-96 rounded-xl",
          formButtonPrimary:
            "bg-neutral-500/70 backdrop-blur-sm hover:bg-neutral-400",
        },
      }}
    />
  );
}
