import { ReadonlyURLSearchParams } from "next/navigation";

import { formatDateToSlug } from "@/shared/utilities/date";

export function generateCalendar(relativeWeek: number, currentDate: Date) {
	const weeks: WeekDay[][] = [];

	// starting minus 1 week
	for (let index = -1; index < 3; index += 1) {
		const week = generateWeekDays(relativeWeek + index, currentDate);
		weeks.push(week);
	}

	return weeks.flat();
}

export function generateWeekDays(relativeWeek: number, currentDate: Date) {
	const now = new Date(currentDate);

	now.setHours(0, 0, 0, 0); // Start of day
	now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)); // Start of week
	now.setDate(now.getDate() + relativeWeek * 7); // Adjust for relativeWeek

	const days = [];

	for (let index = 0; index < 7; index += 1) {
		const date = new Date(now);
		date.setDate(date.getDate() + index);

		const weekDay: WeekDay = {
			date,
			week: relativeWeek,
		};

		days.push(weekDay);
	}

	return days;
}

export interface WeekDay {
	date: Date;
	week: number;
}

export function getDateFromPathname(pathname: string) {
	if (!pathname.startsWith("/schedule")) {
		throw new Error("Invalid pathname");
	}

	const parts = pathname.split("/");

	if (parts.length !== 5) {
		return new Date();
	}

	const yearPart = parts[2];
	const monthPart = parts[3];
	const dayPart = parts[4];

	if (!yearPart || !monthPart || !dayPart) {
		return new Date();
	}

	const year = Number.parseInt(yearPart);
	const month = Number.parseInt(monthPart);
	const day = Number.parseInt(dayPart);

	return new Date(year, month - 1, day);
}

export function createDayLink(date: Date, searchParams: ReadonlyURLSearchParams | URLSearchParams) {
	const params = searchParams.toString();

	return `/schedule/${formatDateToSlug(date)}${params === "" ? "" : `?${params}`}`;
}
