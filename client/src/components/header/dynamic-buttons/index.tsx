import { UserCircleIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/button";
import ScoreSwitcher from "@/components/score-switcher";
import ThemeSwitcher from "@/components/theme-switcher";

export function HeaderDynamicButtons() {
	return (
		<div className="mr-[var(--scrollbar-width)] flex items-center gap-1 pr-2 sm:gap-2 sm:pr-4">
			<ScoreSwitcher />
			<ThemeSwitcher />
			<Button
				className="btn-circle btn-ghost"
				leftIcon={iconClassName => <UserCircleIcon className={iconClassName} />}
			/>
		</div>
	);
}
