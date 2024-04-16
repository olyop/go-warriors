import cx from "classnames";
import { createElement } from "react";

import { NBAAPIGame } from "@/clients/nba/types";

import { Game } from "./game";

export function Games({ games, className }: Readonly<GamesProps>) {
	return (
		<div className={cx("grid grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] gap-4 sm:gap-8", className)}>
			{games.map((game, index) => (
				<Game key={game?.gameID ?? index} game={game} />
			))}
		</div>
	);
}

export interface GamesProps {
	games: (NBAAPIGame | undefined)[];
	className?: string | undefined;
}
