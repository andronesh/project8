import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavSidebar from "@/components/common/NavSidebar";
import TanstackQueryClientProvider from "@/tanstack_query/TanstackQueryClientProvider";

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
			<body className={inter.className + " bg-background text-gray-300"}>
				<TanstackQueryClientProvider>
					<NavSidebar />
					<div className="h-screen p-2 sm:ml-44">{children}</div>
				</TanstackQueryClientProvider>
			</body>
		</html>
	);
}
