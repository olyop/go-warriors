/* eslint-disable jsx-a11y/label-has-associated-control */
import { CalendarIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@/components/button";
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
			<body suppressHydrationWarning className="drawer">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					<Header />
					<main className="pt-header min-h-screen w-full">
						<div className="mx-auto min-h-[calc(100vh-4rem)] w-full sm:container">{children}</div>
					</main>
				</div>
				<div className="drawer-side absolute z-50 h-full">
					<label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" />
					<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-8">
						<Link href="/schedule">
							<Button
								text="Schedule"
								className="btn-ghost rounded-none"
								leftIcon={iconClassName => <CalendarIcon className={iconClassName} />}
							/>
						</Link>
					</ul>
				</div>
			</body>
		</html>
	);
}
