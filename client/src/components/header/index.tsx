import { Bars3Icon } from "@heroicons/react/24/outline";

import { Button } from "@/components/button";

import { HeaderDynamicButtons } from "./dynamic-buttons";

export function Header() {
	return (
		<header className="h-header navbar bg-base-100 border-b-base-300 fixed z-30 flex w-screen items-center justify-between border-b-2 py-0 pl-2 pr-2 sm:pl-4 sm:pr-4">
			<Button className="btn-ghost" leftIcon={iconClassName => <Bars3Icon className={iconClassName} />} />
			<HeaderDynamicButtons />
		</header>
	);
}
