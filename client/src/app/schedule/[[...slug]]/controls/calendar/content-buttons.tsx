import { ArrowPathIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/button";

export function ScheduleControlsCalendarButtons({
	relativeWeek,
	onReset,
	onBackOneWeek,
	onForwardOneWeek,
}: ScheduleControlsCalendarButtonsProps) {
	return (
		<div className="rounded-b-box border-base-300 flex w-full items-center justify-end gap-1 border-2 border-t-0 p-2">
			{relativeWeek !== 0 && (
				<Button
					text={<b>Reset</b>}
					className="btn-ghost"
					onClick={onReset}
					leftIcon={iconClassName => <ArrowPathIcon className={iconClassName} />}
				/>
			)}
			<Button
				text="Back"
				className="btn-ghost"
				onClick={onBackOneWeek}
				leftIcon={iconClassName => <ChevronUpIcon className={iconClassName} />}
			/>
			<Button
				text="Forward"
				className="btn-ghost"
				onClick={onForwardOneWeek}
				leftIcon={iconClassName => <ChevronDownIcon className={iconClassName} />}
			/>
		</div>
	);
}

export interface ScheduleControlsCalendarButtonsProps {
	relativeWeek: number;
	onReset: () => void;
	onBackOneWeek: () => void;
	onForwardOneWeek: () => void;
}
