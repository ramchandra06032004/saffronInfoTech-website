"use client";
import "../app/globals.css"; // Import Tailwind CSS

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className="dark ">
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
