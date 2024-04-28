import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { Game } from "@/components/game";
import { ServerSideComponentProp } from "@/shared/types";

import { retrieveGame } from "./retrieve-game";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function GamePage({ params: { slug } }: ServerSideComponentProp<{ slug: string | undefined }>) {
	const game = await retrieveGame(slug);

	return (
		<div className="flex flex-col">
			<Game noLink game={game} className="border-base-300 p-8 max-sm:border-y-2" />
			<div className="flex flex-col gap-8 p-8">
				<details className="bg-base-200 collapse">
					<summary className="collapse-title !flex items-center justify-between p-4">
						<p className="text-2xl font-medium">Stats</p>
						<ChevronDownIcon className="size-6" />
					</summary>
					<div className="collapse-content overflow-x-auto">
						<table className="border-base-300 table border-2">
							<thead>
								<tr className="border-base-300 border-b-2">
									<th>Team</th>
									<th>PTS</th>
									<th>FGM</th>
									<th>FGA</th>
									<th>FG%</th>
									<th>FTM</th>
									<th>FTA</th>
									<th>FT%</th>
									<th>TPM</th>
									<th>TPA</th>
									<th>TP%</th>
									<th>OREB</th>
									<th>DREB</th>
									<th>REB</th>
									<th>AST</th>
									<th>PF</th>
									<th>STL</th>
									<th>TO</th>
									<th>BLK</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-base-300 border-b-2">
									<td>{game.home.team.name}</td>
									<td>{game.home.statistics.points}</td>
									<td>{game.home.statistics.fieldGoalsMade}</td>
									<td>{game.home.statistics.fieldGoalsAttempted}</td>
									<td>{game.home.statistics.fieldGoalPercentage}</td>
									<td>{game.home.statistics.freeThrowsMade}</td>
									<td>{game.home.statistics.freeThrowsAttempted}</td>
									<td>{game.home.statistics.freeThrowPercentage}</td>
									<td>{game.home.statistics.threePointersMade}</td>
									<td>{game.home.statistics.threePointersAttempted}</td>
									<td>{game.home.statistics.threePointPercentage}</td>
									<td>{game.home.statistics.offensiveRebounds}</td>
									<td>{game.home.statistics.defensiveRebounds}</td>
									<td>{game.home.statistics.totalRebounds}</td>
									<td>{game.home.statistics.assists}</td>
									<td>{game.home.statistics.personalFouls}</td>
									<td>{game.home.statistics.steals}</td>
									<td>{game.home.statistics.turnovers}</td>
									<td>{game.home.statistics.blocks}</td>
								</tr>
								<tr>
									<td>{game.away.team.name}</td>
									<td>{game.away.statistics.points}</td>
									<td>{game.away.statistics.fieldGoalsMade}</td>
									<td>{game.away.statistics.fieldGoalsAttempted}</td>
									<td>{game.away.statistics.fieldGoalPercentage}</td>
									<td>{game.away.statistics.freeThrowsMade}</td>
									<td>{game.away.statistics.freeThrowsAttempted}</td>
									<td>{game.away.statistics.freeThrowPercentage}</td>
									<td>{game.away.statistics.threePointersMade}</td>
									<td>{game.away.statistics.threePointersAttempted}</td>
									<td>{game.away.statistics.threePointPercentage}</td>
									<td>{game.away.statistics.offensiveRebounds}</td>
									<td>{game.away.statistics.defensiveRebounds}</td>
									<td>{game.away.statistics.totalRebounds}</td>
									<td>{game.away.statistics.assists}</td>
									<td>{game.away.statistics.personalFouls}</td>
									<td>{game.away.statistics.steals}</td>
									<td>{game.away.statistics.turnovers}</td>
									<td>{game.away.statistics.blocks}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</details>
				<details className="bg-base-200 collapse">
					<summary className="collapse-title !flex items-center justify-between p-4">
						<p className="text-2xl font-medium">Players</p>
						<ChevronDownIcon className="size-6" />
					</summary>
					<div className="collapse-content flex flex-col gap-8 overflow-x-auto">
						<div className="flex flex-col gap-4">
							<h2 className="text-lg font-medium">Home</h2>
							<table className="border-base-300 table border-2">
								<thead>
									<tr className="border-base-300 border-b-2">
										<th>Name</th>
										<th>MIN</th>
										<th>PTS</th>
										<th>FGM</th>
										<th>FGA</th>
										<th>FG%</th>
										<th>FTM</th>
										<th>FTA</th>
										<th>FT%</th>
										<th>TPM</th>
										<th>TPA</th>
										<th>TP%</th>
										<th>OREB</th>
										<th>DREB</th>
										<th>REB</th>
										<th>AST</th>
										<th>PF</th>
										<th>STL</th>
										<th>TO</th>
										<th>BLK</th>
										<th>+/-</th>
									</tr>
								</thead>
								<tbody>
									{game.home.players.map(player => (
										<tr key={player.player.playerID} className="border-base-300 border-b-2 last:border-b-0">
											<td>
												{player.player.firstName} {player.player.lastName}
											</td>
											<td>{player.statistics.minutes}</td>
											<td>{player.statistics.points}</td>
											<td>{player.statistics.fieldGoalsMade}</td>
											<td>{player.statistics.fieldGoalsAttempted}</td>
											<td>{player.statistics.fieldGoalPercentage}</td>
											<td>{player.statistics.freeThrowsMade}</td>
											<td>{player.statistics.freeThrowsAttempted}</td>
											<td>{player.statistics.freeThrowPercentage}</td>
											<td>{player.statistics.threePointersMade}</td>
											<td>{player.statistics.threePointersAttempted}</td>
											<td>{player.statistics.threePointPercentage}</td>
											<td>{player.statistics.offensiveRebounds}</td>
											<td>{player.statistics.defensiveRebounds}</td>
											<td>{player.statistics.totalRebounds}</td>
											<td>{player.statistics.assists}</td>
											<td>{player.statistics.personalFouls}</td>
											<td>{player.statistics.steals}</td>
											<td>{player.statistics.turnovers}</td>
											<td>{player.statistics.blocks}</td>
											<td>{player.statistics.plusMinus}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="flex flex-col gap-4">
							<h2 className="text-lg font-medium">Away</h2>
							<table className="border-base-300 table border-2">
								<thead>
									<tr className="border-base-300 border-b-2">
										<th>Name</th>
										<th>MIN</th>
										<th>PTS</th>
										<th>FGM</th>
										<th>FGA</th>
										<th>FG%</th>
										<th>FTM</th>
										<th>FTA</th>
										<th>FT%</th>
										<th>TPM</th>
										<th>TPA</th>
										<th>TP%</th>
										<th>OREB</th>
										<th>DREB</th>
										<th>REB</th>
										<th>AST</th>
										<th>PF</th>
										<th>STL</th>
										<th>TO</th>
										<th>BLK</th>
										<th>+/-</th>
									</tr>
								</thead>
								<tbody>
									{game.away.players.map(player => (
										<tr key={player.player.playerID} className="border-base-300 border-b-2 last:border-b-0">
											<td>
												{player.player.firstName} {player.player.lastName}
											</td>
											<td>{player.statistics.minutes}</td>
											<td>{player.statistics.points}</td>
											<td>{player.statistics.fieldGoalsMade}</td>
											<td>{player.statistics.fieldGoalsAttempted}</td>
											<td>{player.statistics.fieldGoalPercentage}</td>
											<td>{player.statistics.freeThrowsMade}</td>
											<td>{player.statistics.freeThrowsAttempted}</td>
											<td>{player.statistics.freeThrowPercentage}</td>
											<td>{player.statistics.threePointersMade}</td>
											<td>{player.statistics.threePointersAttempted}</td>
											<td>{player.statistics.threePointPercentage}</td>
											<td>{player.statistics.offensiveRebounds}</td>
											<td>{player.statistics.defensiveRebounds}</td>
											<td>{player.statistics.totalRebounds}</td>
											<td>{player.statistics.assists}</td>
											<td>{player.statistics.personalFouls}</td>
											<td>{player.statistics.steals}</td>
											<td>{player.statistics.turnovers}</td>
											<td>{player.statistics.blocks}</td>
											<td>{player.statistics.plusMinus}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</details>
			</div>
		</div>
	);
}
