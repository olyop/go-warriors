import { fetchNBAAPI } from "@/clients/nba";
import { NBAAPIGame } from "@/clients/nba/types";

export async function retrieveGame(gameID: string | undefined) {
	if (gameID === undefined) {
		throw new Error("Game not found");
	}

	const response = await fetchNBAAPI<NBAAPIGame>(`/games/${gameID}`, {
		cache: 5,
	});

	if (response.data === null) {
		throw new Error("Game not found");
	}

	const game = response.data[0];

	if (game === undefined) {
		throw new Error("Game not found");
	}

	return game;
}
