export function Content({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="pt-header min-h-screen w-full">
			<div className="mx-auto min-h-[calc(100vh-5rem)] w-full sm:container">{children}</div>
		</main>
	);
}
