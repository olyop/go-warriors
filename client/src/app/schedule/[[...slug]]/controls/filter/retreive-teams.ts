import { fetchNBAAPI } from "@/clients/nba";
import { NBAAPITeam } from "@/clients/nba/types";

export async function retreiveTeams() {
	const response = await fetchNBAAPI<NBAAPITeam>("/teams", {
		enableCache: true,
	});

	if (response.data === null) {
		throw new Error("No data returned");
	}

	return response.data;
}
