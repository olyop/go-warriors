/* eslint-disable unicorn/consistent-function-scoping */

/* eslint-disable react/no-array-index-key */
import { ArrowPathIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { Fragment, useEffect, useState } from "react";

import { Button } from "@/components/button";
import { dateDateFormatter, dateMonthLongFormatter } from "@/shared/intl";
import { generateCalendar, isDateToday } from "@/shared/utilities/date";

export function ScheduleControlsCalendar({
	startingWeek: startingWeekParent,
	onDateChange,
}: ScheduleControlsCalendarProps) {
	const [startingWeek, setStartingWeek] = useState(startingWeekParent);

	const calendar = generateCalendar(startingWeek);

	function handleDateSelect(date: Date, startingWeekValue: number) {
		return () => {
			onDateChange(date, startingWeekValue);
		};
	}

	function handleReset() {
		setStartingWeek(0);
	}

	function handleBackOneWeek() {
		setStartingWeek(prevState => prevState - 1);
	}

	function handleForwardOneWeek() {
		setStartingWeek(prevState => prevState + 1);
	}

	useEffect(() => {
		setStartingWeek(startingWeekParent);
	}, [startingWeekParent]);

	return (
		<Fragment>
			<div className="rounded-t-box border-base-300 bg-base-300 grid w-full grid-cols-7 items-center gap-0.5 border-2">
				{Array.from({ length: 7 }).map((_, index) => (
					<p
						key={index}
						className={cx(
							"bg-base-200 block px-2 py-2 text-sm uppercase sm:px-3 sm:text-base",
							index === 0 && "rounded-tl-box",
							index === 6 && "rounded-tr-box",
						)}
					>
						<b>{dayOfWeekAsString(index)}</b>
					</p>
				))}
			</div>
			<div className="border-base-300 bg-base-300 grid grid-rows-4 gap-0.5 border-b-2 border-l-2 border-r-2">
				{calendar.map((week, index) => (
					<div
						key={week[0]?.date.toISOString()}
						className={cx(
							"grid grid-cols-7 gap-0.5 font-mono text-sm",
							index === calendar.length - 1 && "rounded-b-box",
						)}
					>
						{week.map(day => (
							<Button
								key={day.date.toISOString()}
								onClick={handleDateSelect(day.date, day.week)}
								textClassName="text-xs flex flex-col items-start justify-between gap-2 truncate"
								text={
									<Fragment>
										<b className="sm:text-base">
											{dateDateFormatter.format(day.date)}
											{getDatePlural(day.date.getDate())}
										</b>
										<span>{dateMonthLongFormatter.format(day.date)}</span>
									</Fragment>
								}
								className={cx(
									"btn-ghost bg-base-100 hover:bg-base-300 flex h-auto min-h-0 items-start justify-start rounded-none p-2 sm:p-3",
									isDateToday(day.date) && "bg-base-200",
								)}
							/>
						))}
					</div>
				))}
			</div>
			<div className="rounded-b-box border-base-300 flex w-full items-center justify-end border-2 border-t-0 p-2">
				{startingWeek !== 0 && (
					<Button
						text={<b>Reset</b>}
						className="btn-ghost"
						onClick={handleReset}
						leftIcon={iconClassName => <ArrowPathIcon className={iconClassName} />}
					/>
				)}
				<Button
					text="Back"
					className="btn-ghost"
					onClick={handleBackOneWeek}
					leftIcon={iconClassName => <ChevronUpIcon className={iconClassName} />}
				/>
				<Button
					text="Forward"
					className="btn-ghost"
					onClick={handleForwardOneWeek}
					leftIcon={iconClassName => <ChevronDownIcon className={iconClassName} />}
				/>
			</div>
		</Fragment>
	);
}

export interface ScheduleControlsCalendarProps {
	startingWeek: number;
	onDateChange: (value: Date, startingWeek: number) => void;
}

function getDatePlural(date: number) {
	switch (date) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}

function dayOfWeekAsString(index: number) {
	switch (index) {
		case 0:
			return "Mon";
		case 1:
			return "Tue";
		case 2:
			return "Wed";
		case 3:
			return "Thu";
		case 4:
			return "Fri";
		case 5:
			return "Sat";
		case 6:
			return "Sun";
		default:
			return "";
	}
}
