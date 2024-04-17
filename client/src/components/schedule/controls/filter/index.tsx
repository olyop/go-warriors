/* eslint-disable react/no-array-index-key */
import { CalendarIcon, CheckIcon, ClockIcon, PlusIcon, StarIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { useEffect, useRef, useState } from "react";

import { fetchNBAAPI } from "@/clients/nba";
import { NBAAPITeam } from "@/clients/nba/types";
import { Button } from "@/components/button";

import { GamesFilter } from "../../types";
import { splitTeamsByConferenceAndDivision } from "./teams-helpers";

export function ScheduleControlsFilter({
	filter,
	onStatusSelect,
	onTeamsSelect,
	onTeamSelect,
}: Readonly<ScheduleControlsFilterProps>) {
	const abortControllerRef = useRef(new AbortController());

	const [teams, setTeams] = useState<NBAAPITeam[] | string | null>(null);

	function handleTeamChoose(teamID: number) {
		return () => {
			onTeamSelect(teamID);
		};
	}

	function handleTeamsChoose(teamIDs: number[]) {
		return () => {
			onTeamsSelect(teamIDs);
		};
	}

	function handleStatusSelect(status: string) {
		return () => {
			onStatusSelect(status);
		};
	}

	async function handleGetTeams() {
		abortControllerRef.current = new AbortController();

		try {
			const response = await fetchNBAAPI<NBAAPITeam>("/teams", {
				enableCache: true,
				signal: abortControllerRef.current.signal,
			});

			setTeams(response.data);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "The user aborted a request.") {
					setTeams(null);
				} else {
					setTeams(error.message);
				}
			} else {
				setTeams("An unknown error occurred");
			}
		}
	}

	useEffect(() => {
		void handleGetTeams();

		return () => {
			abortControllerRef.current.abort();
		};
	}, []);

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
				) : teams === null ? null : (
					<div className="sm:rounded-box border-base-300 rounded-box grid grid-rows-2 border-2 sm:grid-cols-2 sm:grid-rows-none">
						{splitTeamsByConferenceAndDivision(teams).map(conference => (
							<div
								key={conference.name}
								className="border-base-300 flex flex-col last:pt-8 sm:border-r-2 sm:last:border-r-0 sm:last:pt-0"
							>
								<div className="flex items-center justify-between px-4 pb-2 pt-4">
									<div className="flex flex-col">
										<h3 className="text-xl uppercase">
											<b>{conference.name}</b>
										</h3>
										<p className="text-[0.7rem] uppercase">Conference</p>
									</div>
									<Button
										className={cx(
											"btn-circle",
											filter?.teams?.every(teamID =>
												conference.divisions
													.flatMap(division => division.teams.map(team => team.teamID))
													.includes(teamID),
											)
												? "btn-neutral"
												: "btn-ghost",
										)}
										onClick={handleTeamsChoose(
											conference.divisions.flatMap(division => division.teams.map(team => team.teamID)),
										)}
										leftIcon={iconClassName => <PlusIcon className={iconClassName} />}
									/>
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
																"grow justify-between px-4 sm:px-2",
																filter?.teams?.includes(team.teamID) ? "btn-success" : "btn-ghost",
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
																filter?.teams?.includes(team.teamID) ? (
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
	onStatusSelect: (status: string) => void;
	onTeamSelect: (teamID: number) => void;
	onTeamsSelect: (teamIDs: number[]) => void;
}
