import React from "react";
import { AuthWrapper } from "../components";

interface LayoutProps {
  children?: React.ReactNode
}

export default function NavLayout({ children }: LayoutProps) {
  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  )
}
