import cx from "classnames";

const calendarWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function ScheduleControlsCalendarContentDayNames() {
	return (
		<div className="rounded-t-box border-base-300 bg-base-300 grid w-full grid-cols-7 items-center gap-0.5 border-2">
			{calendarWeekDays.map((day, index) => (
				<p
					key={day}
					className={cx(
						"bg-base-200 px-2 py-2 text-base sm:px-3 sm:text-base",
						index === 0 && "rounded-tl-box",
						index === 6 && "rounded-tr-box",
					)}
				>
					<b>
						<span className="hidden sm:block">{day}</span>
						<span className="block sm:hidden">{day.slice(0, 3)}</span>
					</b>
				</p>
			))}
		</div>
	);
}
