/* eslint-disable no-continue */
const validSearchParams = new Set(["filter-status", "filter-teams"]);
const validStatuses = new Set(["scheduled", "in_progress", "final", "halftime", "end_of_period"]);

export function createGamesFilter(searchParams: URLSearchParams | Record<string, string>) {
	const searchParamsMap = mapValidateSearchParams(searchParams);

	const filter: GamesFilter = {
		status: null,
		teams: null,
	};

	if (searchParamsMap.has("filter-status")) {
		filter.status = searchParamsMap.get("filter-status") ?? null;
	}

	if (searchParamsMap.has("filter-teams")) {
		filter.teams = searchParamsMap.get("filter-teams")?.split(",") ?? null;
	}

	return filter;
}

export function mapValidateSearchParams(searchParams: URLSearchParams | Record<string, string>) {
	const params = new Map<string, string>();

	const asyncIterable = searchParams instanceof URLSearchParams ? searchParams.entries() : Object.entries(searchParams);

	for (const searchParam of asyncIterable) {
		const [key, value] = searchParam;

		if (!validSearchParams.has(key)) {
			continue;
		}

		if (key === "filter-status") {
			if (!validStatuses.has(value)) {
				continue;
			}

			params.set("filter-status", value);
		}

		if (key === "filter-teams") {
			const teams = value.trim().split(",");

			if (teams.length === 0) {
				continue;
			}

			let valid = true;

			for (const team of teams) {
				// try convert to number
				if (Number.isNaN(Number(team))) {
					valid = false;
					break;
				}
			}

			if (!valid) {
				continue;
			}

			params.set("filter-teams", teams.join(","));
		}
	}

	return params;
}

export interface GamesFilter {
	status: string | null;
	teams: string[] | null;
}
