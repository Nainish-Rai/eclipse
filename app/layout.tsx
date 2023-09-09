import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eclipse",
  description: "An AI image generation and sharing platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark max-h-screen">
        <body className={inter.className}>
          <main
            className={`
              w-full lg:max-h-screen overflow-auto lg:h-screen
              p-0 m-0 bg-[url('../public/hero.png')]`}
          >
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
