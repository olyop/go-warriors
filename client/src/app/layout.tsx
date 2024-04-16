import type { Metadata } from "next";
import { createElement } from "react";

import { Content } from "@/components/content";
import { Header } from "@/components/header";
import { ThemeScript } from "@/lib/theme-script";
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
				<ThemeScript />
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
