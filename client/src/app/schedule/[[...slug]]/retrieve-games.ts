import { FetchNBAAPIParams, fetchNBAAPI } from "@/clients/nba";
import { NBAAPIGame } from "@/clients/nba/types";
import { GamesFilter } from "@/shared/utilities/games-filter";

export async function retrieveGames(date: Date, filter: GamesFilter) {
	const params: FetchNBAAPIParams = {
		date,
	};

	if (filter.status) {
		params["status"] = filter.status;
	}

	if (filter.teams) {
		params["teams"] = filter.teams.join(",");
	}

	const response = await fetchNBAAPI<NBAAPIGame>("/games", {
		params,
	});

	return response.data ?? [];
}
