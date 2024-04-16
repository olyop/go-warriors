import cx from "classnames";
import { ReactNode } from "react";

import { Button } from "@/components/button";

export function GamesControlsButton({
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
			className={cx(
				"sm:btn-circle h-full !min-h-0 !w-auto flex-col items-center gap-0.5 !rounded-none p-2 sm:h-auto",
				removeButtonGhost || "btn-ghost",
				className,
			)}
			leftIcon={iconClassName => icon(cx(iconClassName, "size-[1.05rem]"))}
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
