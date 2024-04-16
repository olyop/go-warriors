import { ArrowLongLeftIcon, ArrowLongRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import Link from "next/link";
import { ReactNode, createElement, useContext, useEffect, useState } from "react";

import { NBAAPIGame, NBAAPIGameTeam } from "@/clients/nba/types";
import { ScoresContext } from "@/contexts/scores-context";

import { gameStatusSwitch, splitTeamName, teamColorSwitch } from "./utilities";

export function Game({ game }: Readonly<GameProps>) {
	const [scores] = useContext(ScoresContext);

	return (
		<Link
			href={game ? `/games/${game.gameID}` : ""}
			className={cx(
				"btn bg-base-100 hover:bg-base-300 rounded-box group relative grid h-auto min-h-0 w-full grid-cols-[1fr,4rem,1fr] grid-rows-1 items-center justify-items-center gap-4 overflow-hidden border p-4 transition-all duration-300 hover:border-gray-300 sm:p-6",
				game || "skeleton dark:!bg-neutral cursor-not-allowed text-transparent",
			)}
		>
			<div
				className={cx(
					"absolute left-0 top-0 z-10 size-full transition-opacity",
					game &&
						gameStatusSwitch(
							game,
							`dark:from-neutral from-base-100 bg-gradient-to-l opacity-50 group-hover:opacity-100 ${teamColorSwitch(game.home.team.code)}`,
							`dark:from-neutral from-base-100 bg-gradient-to-r opacity-50 group-hover:opacity-100 ${teamColorSwitch(game.away.team.code)}`,
							"",
							"",
						),
				)}
			/>
			<GameTeam gameTeam={game?.home} />
			<p className="z-20 text-center text-lg uppercase">
				<b>vs</b>
			</p>
			<GameTeam gameTeam={game?.away} />
			<GameTeamScore gameTeam={game?.home} />
			{scores.hide || !game ? (
				<div />
			) : (
				<div className="z-20 flex items-center justify-center">
					{gameStatusSwitch<ReactNode>(
						game,
						<ArrowLongLeftIcon className="size-6" />,
						<ArrowLongRightIcon className="size-6" />,
						<EllipsisHorizontalIcon className="size-6" />,
						null,
					)}
				</div>
			)}
			<GameTeamScore gameTeam={game?.away} />
		</Link>
	);
}

function GameTeam({ gameTeam }: Readonly<GameTeamProps>) {
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

function GameTeamScore({ gameTeam }: Readonly<GameTeamProps>) {
	const [scores] = useContext(ScoresContext);

	const [show, setShow] = useState(scores.hide);

	const points = gameTeam?.score?.points;

	useEffect(() => {
		setShow(scores.hide);
	}, [scores.hide]);

	return (
		<div className="flex h-8 items-center justify-center">
			{points === undefined ? (
				<p className="hidden text-center text-2xl">Loading</p>
			) : show ? (
				<p className="text-center text-2xl">{points}</p>
			) : (
				<p className="border-base-300 rounded-box border px-2 py-1 uppercase">Hidden</p>
			)}
		</div>
	);
}

interface GameTeamProps {
	gameTeam: NBAAPIGameTeam | undefined;
}

export interface GameProps {
	game: NBAAPIGame | undefined;
}
