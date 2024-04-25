import { ReadonlyURLSearchParams } from "next/navigation";

import { GamesFilter } from "@/shared/utilities/games-filter";

import { createDayLink } from "../../utilities";

export function createApplyLink(date: Date, searchParams: ReadonlyURLSearchParams, filter: GamesFilter) {
	const searchParamsCopy = new URLSearchParams(searchParams);

	console.log(filter);

	if (filter.status === null) {
		searchParamsCopy.delete("filter-status");
	} else {
		searchParamsCopy.set("filter-status", filter.status);
	}

	if (filter.teams === null) {
		searchParamsCopy.delete("filter-teams");
	} else {
		searchParamsCopy.set("filter-teams", filter.teams.join(","));
	}

	return createDayLink(date, searchParamsCopy);
}
