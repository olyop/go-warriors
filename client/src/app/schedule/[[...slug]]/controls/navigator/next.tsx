import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { OnClickProps } from "@/shared/props";

import { ScheduleControlsButton as ControlButton } from "../control-button";

export function ScheduleControlsNavigatorNext({ onClick }: OnClickProps) {
	return (
		<ControlButton
			text="Next"
			onClick={onClick}
			className="hidden sm:flex"
			icon={iconClassName => <ChevronRightIcon className={iconClassName} />}
		/>
	);
}
