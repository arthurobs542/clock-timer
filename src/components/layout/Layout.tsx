"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: "employee" | "admin";
  };
  showFooter?: boolean;
}

export function Layout({ children, user, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
