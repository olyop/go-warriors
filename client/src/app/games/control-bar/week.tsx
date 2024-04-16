/* eslint-disable unicorn/consistent-function-scoping */
import cx from "classnames";
import { Fragment } from "react";

import { Button } from "@/components/button";
import { dateDateFormatter, dateDayFormatter, dateMonthFormatter } from "@/shared/intl";
import { generateWeekDays, isDateToday, isSameDay } from "@/shared/utilities/date";

export function GamesControlsWeekDays({ date, startingWeek, onSelectDay }: GamesControlsWeekDaysProps) {
	return (
		<div className="tabs sm:!tabs-bordered border-base-300 grid h-full grow grid-cols-7 justify-self-stretch border-x-2 sm:border-0">
			{generateWeekDays(startingWeek).map(day => (
				<Button
					key={day.date.toISOString()}
					onClick={onSelectDay(day.date)}
					className={cx(
						"tab tab-block no-animation !border-base-300 block h-full min-h-0 gap-1 truncate !rounded-none border-0 bg-transparent px-0 py-3.5 font-mono leading-none last:border-r-0 sm:border-0 sm:px-2 sm:pb-2 sm:pt-2",
						date || "skeleton dark:!bg-neutral transition-all",
						date && isSameDay(day.date, date) && "!bg-base-300",
						date && isDateToday(day.date) && "!bg-base-200",
					)}
					textClassName="flex flex-col items-center gap-1 justify-center"
					text={
						<Fragment>
							<span className={cx("text sm:text-base", date || "opacity-0")}>
								{date ? dateDayFormatter.format(day.date) : "."}
							</span>
							<span className={cx("text-[0.6rem] sm:text-base", date || "invisible")}>
								{date ? (
									<b>
										{dateDateFormatter.format(day.date)} {dateMonthFormatter.format(day.date)}
									</b>
								) : (
									"."
								)}
							</span>
						</Fragment>
					}
				/>
			))}
		</div>
	);
}

export interface GamesControlsWeekDaysProps {
	date: Date | null;
	startingWeek: number;
	onSelectDay: (value: Date) => () => void;
}
