import cx from "classnames";
import { createElement } from "react";

import { NBAAPIGame } from "@/clients/nba/types";
import { Game } from "@/components/game";

export function Games({ games, className }: Readonly<GamesProps>) {
	return (
		<div className={cx("grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] gap-4 sm:gap-8", className)}>
			{games.map((game, index) => (
				<Game
					key={game?.gameID ?? index}
					game={game}
					className="btn bg-base-200 hover:bg-base-300 rounded-box border-base-300 border p-4 transition-all duration-300 sm:p-6"
				/>
			))}
		</div>
	);
}

export interface GamesProps {
	games: (NBAAPIGame | null)[];
	className?: string | undefined;
}
