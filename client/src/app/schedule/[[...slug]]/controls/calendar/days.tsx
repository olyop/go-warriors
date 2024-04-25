import cx from "classnames";
import Link from "next/link";
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";

import { dateDateFormatter, dateMonthFormatter, dateMonthLongFormatter } from "@/shared/intl";
import { isDateToday, isSameDay } from "@/shared/utilities/date";

import { createDayLink, generateCalendar, getDateFromPathname } from "../utilities";

export function ScheduleControlsCalendarContentDays({
	relativeWeek,
	onSelect,
}: ScheduleControlsCalendarContentDaysProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentDate = getDateFromPathname(pathname);
	const calendar = generateCalendar(relativeWeek, currentDate);

	return (
		<div className="border-base-300 bg-base-300 grid grid-cols-7 grid-rows-4 gap-0.5 border-b-2 border-l-2 border-r-2">
			{calendar.map(date => (
				<ScheduleControlsCalendarContentDay
					key={date.date.toISOString()}
					date={date.date}
					currentDate={currentDate}
					searchParams={searchParams}
					onSelect={onSelect}
				/>
			))}
		</div>
	);
}

export interface ScheduleControlsCalendarContentDaysProps {
	relativeWeek: number;
	onSelect: () => void;
}

export function ScheduleControlsCalendarContentDay({
	date,
	currentDate,
	searchParams,
	onSelect,
}: ScheduleControlsCalendarContentDayProps) {
	return (
		<Link
			onClick={onSelect}
			key={date.toISOString()}
			href={createDayLink(date, searchParams)}
			className={cx(
				"flex h-auto min-h-0 flex-col items-start justify-between gap-1 truncate rounded-none p-2 sm:p-3",
				isDateToday(date) || isSameDay(date, currentDate)
					? "bg-base-200 hover:bg-base-200 focus:bg-base-200"
					: "bg-base-100 hover:bg-base-200 focus:bg-base-200",
			)}
		>
			<b>{dateDateFormatter.format(date) + getDatePlural(date.getDate())}</b>
			<span className="text-xs sm:text-base">
				<span className="block sm:hidden">{dateMonthFormatter.format(date)}</span>
				<span className="hidden sm:block">{dateMonthLongFormatter.format(date)}</span>
			</span>
		</Link>
	);
}

export interface ScheduleControlsCalendarContentDayProps {
	date: Date;
	currentDate: Date;
	searchParams: ReadonlyURLSearchParams;
	onSelect: () => void;
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
