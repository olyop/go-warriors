import { PropsWithChildren } from "react";

export function ScheduleControlsContainer({ children }: PropsWithChildren) {
	return (
		<div className="bg-base-100 h-header fixed top-[var(--header-height)] z-30 grid w-full grid-cols-[3.5rem,1fr,3.5rem] items-stretch gap-0 shadow-lg sm:static sm:z-auto sm:items-center sm:bg-transparent sm:py-0 sm:shadow-none md:gap-4">
			{children}
		</div>
	);
}
