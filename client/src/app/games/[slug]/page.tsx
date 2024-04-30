import { ServerSideComponentProp } from "@/shared/types";

import { GameView } from "./game-view";
import { retrieveGame } from "./retrieve-game";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function GamePage({ params: { slug } }: ServerSideComponentProp<{ slug: string | undefined }>) {
	const game = await retrieveGame(slug);

	return <GameView game={game} />;
}
