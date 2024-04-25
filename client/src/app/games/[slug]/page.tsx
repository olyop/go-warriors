import { fetchNBAAPI } from "@/clients/nba";
import { NBAAPIGame } from "@/clients/nba/types";
import { ServerSideComponentProp } from "@/shared/types";

export default async function GamePage({ params: { slug } }: ServerSideComponentProp<{ slug: string | undefined }>) {
	if (slug === undefined) {
		return <div>Invalid Game</div>;
	}

	if (slug.length === 0) {
		return <div>Invalid Game</div>;
	}

	const game = await retrieveGame(slug);

	return (
		<div className="p-8">
			<pre>{JSON.stringify(game, undefined, 2)}</pre>
		</div>
	);
}

async function retrieveGame(id: string) {
	const response = await fetchNBAAPI<NBAAPIGame>(`/games/${id}`, {
		enableCache: false,
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
