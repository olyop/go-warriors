export function generateCalendar(startingWeek: number) {
	const weeks: WeekDay[][] = [];

	// starting minus 1 week
	for (let index = -1; index < 3; index += 1) {
		const week = generateWeekDays(startingWeek + index);
		weeks.push(week);
	}

	return weeks;
}

export function generateWeekDays(startingWeek: number) {
	const now = new Date();

	now.setHours(0, 0, 0, 0); // Start of day
	now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)); // Start of week
	now.setDate(now.getDate() + startingWeek * 7); // Adjust for startingWeek

	const days = [];

	for (let index = 0; index < 7; index += 1) {
		const date = new Date(now);
		date.setDate(date.getDate() + index);

		const weekDay: WeekDay = {
			date,
			week: startingWeek,
		};

		days.push(weekDay);
	}

	return days;
}

interface WeekDay {
	date: Date;
	week: number;
}

export function dateToUnixTimeSeconds(value: Date) {
	return Math.floor(value.getTime() / 1000);
}

export function dateStartOfDay(value: Date) {
	const date = new Date(value);

	date.setHours(0, 0, 0, 0);

	return date;
}

export function dateEndOfDay(value: Date) {
	const date = new Date(value);

	date.setHours(23, 59, 59, 999);

	return date;
}

export function isSameDay(date1: Date, date2: Date) {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

export function isDateToday(date: Date) {
	const now = new Date();

	return (
		date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
	);
}
