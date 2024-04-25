import { ArrowLongLeftIcon, ArrowLongRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

import { NBAAPIGame, NBAAPIGameTeam } from "@/clients/nba/types";

import { gameStatusSwitch, splitTeamName } from "./utilities";

export function Game({ game }: Readonly<GameProps>) {
	return (
		<Link
			href={game ? `/games/${game.gameID}` : ""}
			className={cx(
				"btn bg-base-200 hover:bg-base-300 rounded-box border-base-300 group/game relative grid h-auto min-h-0 w-full grid-cols-[1fr,4rem,1fr] grid-rows-1 items-center justify-items-center gap-4 overflow-hidden border p-4 transition-all duration-300 sm:p-6",
				game === null && "skeleton dark:!bg-neutral bg-base-200 cursor-not-allowed text-transparent",
			)}
		>
			<GameBackdrop game={game} />
			<GameTeam gameTeam={game?.home ?? null} />
			<GameVs />
			<GameTeam gameTeam={game?.away ?? null} />
			<GameTeamScore gameTeam={game?.home ?? null} />
			<GameIcon game={game} />
			<GameTeamScore gameTeam={game?.away ?? null} />
		</Link>
	);
}

function GameBackdrop({ game }: GameProps) {
	if (game === null || game.home.score === undefined || game.away.score === undefined) {
		return null;
	}

	return <div className={cx("absolute left-0 top-0 z-10 size-full opacity-50 transition-opacity")} />;
}

function GameTeam({ gameTeam }: Readonly<GameComponentProps>) {
	const [city, team] = splitTeamName(gameTeam?.team.name);

	return (
		<div className="z-20 flex flex-col items-center gap-3">
			{gameTeam ? (
				<img className="h-12" alt={gameTeam.team.name} src={gameTeam.team.logo} />
			) : (
				<div className="size-12" />
			)}
			<h2 className="text-center text-sm sm:text-base">
				<b>{city}</b>
				<br />
				{team}
			</h2>
		</div>
	);
}

function GameVs() {
	return (
		<p className="z-20 text-center text-lg uppercase">
			<b>vs</b>
		</p>
	);
}

function GameIcon({ game }: GameProps) {
	return (
		<div className="z-20 flex items-center justify-center">
			{game === null ? (
				<EllipsisHorizontalIcon className="size-6" />
			) : (
				gameStatusSwitch<ReactNode>(
					game,
					<ArrowLongLeftIcon className="size-6" />,
					<ArrowLongRightIcon className="size-6" />,
					<EllipsisHorizontalIcon className="size-6" />,
					null,
				)
			)}
		</div>
	);
}

function GameTeamScore({ gameTeam }: Readonly<GameComponentProps>) {
	const points = gameTeam?.score?.points;

	return (
		<div className="z-20 flex h-8 items-center justify-center">
			{points === undefined ? (
				<p className="hidden text-center text-2xl">Loading</p>
			) : (
				<Fragment>
					<p className="rounded-box border-base-300 bg-base-100 hidden border-2 px-2 py-1 uppercase group-data-[scores=false]:block">
						Hidden
					</p>
					<p className="text-center text-2xl group-data-[scores=false]:hidden">{points}</p>
				</Fragment>
			)}
			<p>{}</p>
		</div>
	);
}

interface GameComponentProps {
	gameTeam: NBAAPIGameTeam | null;
}

export interface GameProps {
	game: NBAAPIGame | null;
}
