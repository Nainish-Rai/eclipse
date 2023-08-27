import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import ApolloWrapper from "@/lib/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <AuthProvider>
        <body className={inter.className}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </body>
      </AuthProvider>
    </html>
  );
}
