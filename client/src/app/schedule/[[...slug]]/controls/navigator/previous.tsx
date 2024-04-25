import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { OnClickProps } from "@/shared/props";

import { ScheduleControlsButton as ControlButton } from "../control-button";

export function ScheduleControlsNavigatorPrevious({ onClick }: OnClickProps) {
	return (
		<ControlButton
			text="Prev"
			onClick={onClick}
			className="hidden sm:flex"
			icon={iconClassName => <ChevronLeftIcon className={iconClassName} />}
		/>
	);
}
