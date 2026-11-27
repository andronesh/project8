import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavSidebar from "@/components/common/NavSidebar";
import ApiHooksConfiguredProvider from "@/utils/ApiHooksConfiguredProvider";

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
				<ApiHooksConfiguredProvider>
					<NavSidebar />
					<div className="h-screen p-2 sm:ml-44">{children}</div>
				</ApiHooksConfiguredProvider>
			</body>
		</html>
	);
}
