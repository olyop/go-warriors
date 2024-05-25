/* eslint-disable jsx-a11y/label-has-associated-control */
import type { Metadata } from "next";
import { ReactNode } from "react";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
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
			<body suppressHydrationWarning className="drawer">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					<Header />
					<main className="pt-header min-h-screen w-full">
						<div className="mx-auto min-h-[calc(100vh-8rem)] w-full sm:container sm:min-h-[calc(100vh-5rem)]">
							{children}
						</div>
					</main>
				</div>
				<div className="drawer-side z-50 h-full">
					<label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" />
					<div className="menu bg-base-200 text-base-content min-h-full w-80 p-0">
						<Sidebar />
					</div>
				</div>
			</body>
		</html>
	);
}
