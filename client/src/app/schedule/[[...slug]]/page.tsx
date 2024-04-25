import { FetchNBAAPIParams, fetchNBAAPI } from "@/clients/nba";
import { NBAAPIGame } from "@/clients/nba/types";
import { Games } from "@/components/games";
import { ServerSideComponentProp } from "@/shared/types";
import { GamesFilter, createGamesFilter } from "@/shared/utilities/games-filter";

import { convertSlugToDate } from "./utilities";

export default async function Schedule(props: ServerSideComponentProp<{ slug: string[] | undefined }>) {
	const { params, searchParams } = props;

	const date = convertSlugToDate(params.slug ?? null);
	const filter = createGamesFilter(searchParams);

	const games = await retrieveGames(date, filter);

	return <Games games={games} />;
}

async function retrieveGames(date: Date, filter: GamesFilter) {
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
		enableCache: true,
	});

	return response.data ?? [];
}
