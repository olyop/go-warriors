import { ArrowPathIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

import { Button } from "@/components/button";

export function ScheduleControlsFilterButtons({
	onApply,
	onReset,
	onCancel,
}: Readonly<ScheduleControlsFilterButtonsProps>) {
	return (
		<Fragment>
			<Button
				text="Cancel"
				onClick={onCancel}
				className="btn-ghost"
				leftIcon={iconClassName => <XMarkIcon className={iconClassName} />}
			/>
			<Button
				text="Reset"
				onClick={onReset}
				className="btn-ghost"
				leftIcon={iconClassName => <ArrowPathIcon className={iconClassName} />}
			/>
			<Button
				text="Apply"
				onClick={onApply}
				className="btn-success"
				leftIcon={iconClassName => <CheckIcon className={iconClassName} />}
			/>
		</Fragment>
	);
}

export interface ScheduleControlsFilterButtonsProps {
	onApply: () => void;
	onReset: () => void;
	onCancel: () => void;
}
