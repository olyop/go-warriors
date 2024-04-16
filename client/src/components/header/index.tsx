import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

import { Button } from "@/components/button";

const ScoreSwitcher = dynamic(() => import("@/components/score-switcher"), { ssr: false, loading: () => null });
const ThemeSwitcher = dynamic(() => import("@/components/theme-switcher"), { ssr: false, loading: () => null });

export function Header() {
	return (
		<header className="h-header navbar bg-base-100 border-b-base-300 fixed z-30 w-screen border-b-2 px-2 py-0 pr-6 sm:px-5 sm:pr-8">
			<div className="relative flex size-full items-center justify-between">
				<Button className="btn-ghost">
					<Bars3Icon className="size-6" />
					<span className="hidden sm:block">Go Warriors</span>
				</Button>
				<div className="flex items-center gap-2">
					<ScoreSwitcher />
					<ThemeSwitcher />
					<Button className="btn-ghost" leftIcon={iconClassName => <UserCircleIcon className={iconClassName} />} />
				</div>
			</div>
		</header>
	);
}
