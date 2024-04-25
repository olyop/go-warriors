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

export function formatDateToSlug(value: Date) {
	return `${value.getFullYear()}/${String(value.getMonth() + 1).padStart(2, "0")}/${String(value.getDate()).padStart(2, "0")}`;
}

export function formatDateToISO(value: Date) {
	const iso = value.toISOString();
	const isoDate = iso.split("T")[0];

	if (isoDate === undefined) {
		throw new Error("Invalid date");
	}

	return isoDate;
}
