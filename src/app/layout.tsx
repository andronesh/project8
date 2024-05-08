import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavSidebar from "@/components/common/NavSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project8",
  description: "Manage tasks and stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-900 text-gray-300"}>
        <NavSidebar />
        <div className="p-2 sm:ml-44 h-screen">{children}</div>
      </body>
    </html>
  );
}
