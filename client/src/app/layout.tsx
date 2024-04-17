import type { Metadata } from "next";
import { createElement } from "react";

import { Content } from "@/components/content";
import { Header } from "@/components/header";
import { ScoresProvider } from "@/providers/scores-providers";

import "./globals.css";

export const metadata: Metadata = {
	title: "Go Warriors",
	description: "Go Warriors",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang="en" className="!overflow-y-scroll">
			<head>
				<script src="/scripts/theme-script.js" />
			</head>
			<body suppressHydrationWarning>
				<ScoresProvider>
					<Header />
					<Content>{children}</Content>
				</ScoresProvider>
			</body>
		</html>
	);
}
