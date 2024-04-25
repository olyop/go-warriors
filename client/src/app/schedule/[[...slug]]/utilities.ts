export function convertSlugToDate(slug: string[] | null) {
	if (slug === null) {
		return new Date();
	}

	if (slug.length !== 3) {
		return new Date();
	}

	const [year, month, day] = slug;

	if (Number.isNaN(Number(year)) || Number.isNaN(Number(month)) || Number.isNaN(Number(day))) {
		return new Date();
	}

	try {
		return new Date(Number(year), Number(month) - 1, Number(day));
	} catch {
		return new Date();
	}
}
