import cx from "classnames";
import { ReactNode } from "react";

import { Button } from "@/components/button";

export function ScheduleControlsButton({
	text,
	icon,
	onClick,
	className,
	removeButtonGhost = false,
}: Readonly<DatePickerControlProps>) {
	return (
		<Button
			text={text}
			onClick={onClick}
			leftIcon={iconClassName => icon(cx(iconClassName, "size-[1.05rem]"))}
			className={cx(
				"sm:rounded-btn flex h-auto min-h-0 w-auto min-w-0 flex-col items-center gap-1 rounded-none px-0 py-2",
				removeButtonGhost || "btn-ghost",
				className,
			)}
		/>
	);
}

interface DatePickerControlProps {
	text: string;
	icon: (iconClassName: string) => ReactNode;
	onClick: () => void;
	className?: string | undefined;
	removeButtonGhost?: boolean | undefined;
}
