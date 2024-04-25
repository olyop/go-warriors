/* eslint-disable unicorn/consistent-function-scoping */

/* eslint-disable react/no-array-index-key */
import { Fragment, useState } from "react";

import { ScheduleControlsCalendarButtons as CalendarButtons } from "./content-buttons";
import { ScheduleControlsCalendarContentDayNames as ContentDayNames } from "./content-day-names";
import { ScheduleControlsCalendarContentDays as ContentDays } from "./days";

export function ScheduleControlsCalendarContent({ onSelect }: Readonly<ScheduleControlsCalendarContentProps>) {
	const [relativeWeek, setRelativeWeek] = useState(0);

	function handleReset() {
		setRelativeWeek(0);
	}

	function handleBackOneWeek() {
		setRelativeWeek(prevState => prevState - 1);
	}

	function handleForwardOneWeek() {
		setRelativeWeek(prevState => prevState + 1);
	}

	return (
		<Fragment>
			<ContentDayNames />
			<ContentDays relativeWeek={relativeWeek} onSelect={onSelect} />
			<CalendarButtons
				relativeWeek={relativeWeek}
				onReset={handleReset}
				onBackOneWeek={handleBackOneWeek}
				onForwardOneWeek={handleForwardOneWeek}
			/>
		</Fragment>
	);
}

export interface ScheduleControlsCalendarContentProps {
	onSelect: () => void;
}

// function getDatePlural(date: number) {
// 	switch (date) {
// 		case 1:
// 			return "st";
// 		case 2:
// 			return "nd";
// 		case 3:
// 			return "rd";
// 		default:
// 			return "th";
// 	}
// }
