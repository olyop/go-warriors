import { ReactNode } from "react";

import { ScheduleControls } from "./controls";

export default function Layout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div className="mt-header flex flex-col items-center justify-center gap-8 pb-12 pt-4 sm:mt-0 sm:px-8 sm:pt-8 md:pb-16">
			<ScheduleControls />
			<div className="w-full px-4 sm:px-0">{children}</div>
		</div>
	);
}
