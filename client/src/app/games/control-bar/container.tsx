import { PropsWithChildren } from "react";

export function GamesControlsContainer({ children }: PropsWithChildren) {
	return (
		<div className="bg-base-100 border-base-300 fixed top-20 z-30 grid w-full grid-cols-[3.5rem,1fr,3.5rem] items-center justify-items-stretch gap-0 border-b-2 shadow-lg sm:static sm:z-auto sm:grid-cols-[3.5rem,3.5rem,1fr,3.5rem,3.5rem] sm:border-0 sm:bg-transparent sm:py-0 sm:shadow-none md:gap-4">
			{children}
		</div>
	);
}
