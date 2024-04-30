import cx from "classnames";
import Link from "next/link";
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";

import { dateDateFormatter, dateDayFormatter, dateMonthFormatter } from "@/shared/intl";
import { isDateToday, isSameDay } from "@/shared/utilities/date";

import { createDayLink, generateWeekDays, getDateFromPathname } from "../utilities";

export function ScheduleControlsNavigatorWeekDays({ relativeWeek }: ScheduleControlsNavigatorWeekDaysProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentDate = getDateFromPathname(pathname);

	return (
		<div className="tabs sm:!tabs-bordered grid grow grid-cols-7 items-stretch justify-items-stretch rounded-none border-0">
			{generateWeekDays(relativeWeek, currentDate).map(day => (
				<ScheduleControlsNavigatorWeekDay
					date={day.date}
					currentDate={currentDate}
					searchParams={searchParams}
					key={day.date.toISOString()}
				/>
			))}
		</div>
	);
}

function ScheduleControlsNavigatorWeekDay({ date, searchParams, currentDate }: ScheduleControlsNavigatorWeekDayProps) {
	return (
		<Link
			href={createDayLink(date, searchParams)}
			className={cx(
				"sm:border-base-300 flex flex-col items-center justify-center gap-1 truncate px-0 py-3.5 font-mono leading-none sm:border-b-4 sm:px-2 sm:pb-2 sm:pt-2",
				isDateToday(date) && "bg-base-200 hover:bg-base-200 focus:bg-base-200",
				isSameDay(date, currentDate) && "bg-base-300 hover:bg-base-300 focus:bg-base-300",
			)}
		>
			<span className="text sm:text-base">{dateDayFormatter.format(date)}</span>
			<span className="text-[0.6rem] sm:text-base">
				<b>
					{dateDateFormatter.format(date)} {dateMonthFormatter.format(date)}
				</b>
			</span>
		</Link>
	);
}

interface ScheduleControlsNavigatorWeekDaysProps {
	relativeWeek: number;
}

interface ScheduleControlsNavigatorWeekDayProps {
	date: Date;
	currentDate: Date;
	searchParams: ReadonlyURLSearchParams;
}
