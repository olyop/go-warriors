"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/button";
import ScoreSwitcher from "@/components/score-switcher";
import ThemeSwitcher from "@/components/theme-switcher";
import { getScrollbarWidth } from "@/shared/utilities/other";

export function HeaderDynamicButtons() {
	const ref = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState(false);

	const scrollBarWidth = getScrollbarWidth(ref.current);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div
			ref={ref}
			suppressHydrationWarning
			className="flex items-center gap-2 pr-2 sm:pr-4"
			style={{ marginRight: scrollBarWidth > 0 ? `${scrollBarWidth}px` : undefined }}
		>
			<ScoreSwitcher />
			<ThemeSwitcher />
			<Button
				className="btn-neutral btn-circle"
				leftIcon={iconClassName => <UserCircleIcon className={iconClassName} />}
			/>
		</div>
	);
}
