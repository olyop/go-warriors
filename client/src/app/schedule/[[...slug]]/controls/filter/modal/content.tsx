/* eslint-disable react/no-array-index-key */
import { CalendarIcon, CheckIcon, ClockIcon, PlusIcon, StarIcon } from "@heroicons/react/24/outline";
import cx from "classnames";

import { NBAAPITeam } from "@/clients/nba/types";
import { Button } from "@/components/button";
import { GamesFilter } from "@/shared/utilities/games-filter";

import { splitTeamsByConferenceAndDivision } from "../teams-helpers";

export function ScheduleControlsFilterModalContent({
	filter,
	teams,
	onStatusSelect,
	onTeamSelect,
}: Readonly<ScheduleControlsFilterProps>) {
	function handleTeamChoose(teamID: number) {
		return () => {
			onTeamSelect(teamID);
		};
	}

	function handleStatusSelect(status: string) {
		return () => {
			onStatusSelect(status);
		};
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-2 sm:gap-4">
				<h2 className="text-xl">
					<b>Status</b>
				</h2>
				<div className="flex items-center gap-4">
					<Button
						text="Finished"
						onClick={handleStatusSelect("final")}
						leftIcon={iconClassName => <ClockIcon className={iconClassName} />}
						className={filter?.status === "final" ? "btn-success" : undefined}
					/>
					<Button
						text="Live"
						onClick={handleStatusSelect("in_progress")}
						leftIcon={iconClassName => <CalendarIcon className={iconClassName} />}
						className={filter?.status === "in_progress" ? "btn-success" : undefined}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-2 sm:gap-4">
				<h2 className="text-xl">
					<b>Teams</b>
				</h2>
				{typeof teams === "string" ? (
					<p className="text-error">{teams}</p>
				) : (
					<div className="sm:rounded-box border-base-300 rounded-box grid grid-rows-2 border-2 sm:grid-cols-2 sm:grid-rows-none">
						{splitTeamsByConferenceAndDivision(teams).map(conference => (
							<div
								key={conference.name}
								className="border-base-300 flex flex-col last:pt-8 sm:border-r-2 sm:last:border-r-0 sm:last:pt-0"
							>
								<div className="flex items-center justify-between pb-2 pl-4 pr-2 pt-4">
									<div className="flex flex-col">
										<h3 className="text-xl uppercase">
											<b>{conference.name}</b>
										</h3>
										<p className="text-[0.7rem] uppercase">Conference</p>
									</div>
								</div>
								<div className="flex flex-col gap-2 pt-2">
									{conference.divisions.map(division => (
										<div key={division.name} className="flex flex-col overflow-x-hidden">
											<h4 className="px-4 text-sm uppercase tracking-wider">
												<u>{division.name}</u>
											</h4>
											<div className="flex w-full flex-col justify-stretch gap-1 p-2">
												{division.teams.map(team => (
													<div key={team.teamID} className="flex w-full justify-between gap-1">
														<Button
															groupLeft
															groupClassName="flex items-center gap-2"
															onClick={handleTeamChoose(team.teamID)}
															className={cx(
																"grow justify-between px-2",
																filter?.teams?.includes(String(team.teamID)) ? "btn-success" : "btn-ghost",
															)}
															leftIcon={iconClassName => (
																<img
																	src={team.logo}
																	className={cx(iconClassName, "h-7 w-auto")}
																	alt={`${team.name} logo`}
																/>
															)}
															text={team.name}
															rightIcon={iconClassName =>
																filter?.teams?.includes(String(team.teamID)) ? (
																	<CheckIcon className={iconClassName} />
																) : (
																	<PlusIcon className={iconClassName} />
																)
															}
														/>
														<Button
															className="btn-ghost"
															leftIcon={iconClassName => <StarIcon className={cx(iconClassName, "size-5")} />}
														/>
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export interface ScheduleControlsFilterProps {
	filter: GamesFilter | null;
	teams: NBAAPITeam[];
	onStatusSelect: (status: string) => void;
	onTeamSelect: (teamID: number) => void;
}
