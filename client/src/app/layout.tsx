import type { Metadata } from "next";
import { ReactNode } from "react";

import { Header } from "@/components/header";
import { ScoresScript } from "@/lib/scores-scripts";
import { ScrollbarScript } from "@/lib/scrollbar-script";
import { ThemeScript } from "@/lib/theme-script";

import "./globals.css";

export const metadata: Metadata = {
	title: "Go Warriors",
	description: "Go Warriors",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang="en" className="group !overflow-y-scroll" data-scores="true">
			<head>
				<ThemeScript />
				<ScoresScript />
				<ScrollbarScript />
			</head>
			<body suppressHydrationWarning>
				<Header />
				<main className="pt-header min-h-screen w-full">
					<div className="mx-auto min-h-[calc(100vh-4rem)] w-full sm:container">{children}</div>
				</main>
			</body>
		</html>
	);
}
