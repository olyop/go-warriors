"use client";

import { useState } from "react";

import { ScheduleControlsNavigatorNext as NavigatorNext } from "./next";
import { ScheduleControlsNavigatorPrevious as NavigatorPrevious } from "./previous";
import { ScheduleControlsNavigatorWeekDays as NavigatorWeekDays } from "./week-days";

export function ScheduleControlsNavigator() {
	const [relativeWeek, setRelativeWeek] = useState(0);

	function handleBackOneWeek() {
		setRelativeWeek(prevState => prevState - 1);
	}

	function handleForwardOneWeek() {
		setRelativeWeek(prevState => prevState + 1);
	}

	return (
		<div className="border-base-300 grid items-stretch max-sm:border-t-2 sm:grid-cols-[3.5rem,1fr,3.5rem] sm:items-center sm:gap-4">
			<NavigatorPrevious onClick={handleBackOneWeek} />
			<NavigatorWeekDays relativeWeek={relativeWeek} />
			<NavigatorNext onClick={handleForwardOneWeek} />
		</div>
	);
}

export interface ScheduleControlsNavigatorProps {
	currentDate: Date;
}
