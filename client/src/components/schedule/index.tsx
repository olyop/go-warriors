"use client";

/* eslint-disable react/no-array-index-key, unicorn/no-new-array */
import { useEffect, useRef, useState } from "react";

import { FetchNBAAPIParams, fetchNBAAPI } from "@/clients/nba";
import { NBAAPIGame } from "@/clients/nba/types";
import { Games } from "@/components/games";
import { dateEndOfDay, dateStartOfDay, dateToUnixTimeSeconds } from "@/shared/utilities/date";

import { ScheduleControls } from "./controls";
import { GamesFilter, GamesState } from "./types";

export default function Schedule() {
	const abortControllerRef = useRef(new AbortController());

	const [games, setGames] = useState<GamesState>(null);
	const [date, setDate] = useState<Date | null>(null);
	const [filter, setFilter] = useState<GamesFilter | null>(null);

	function handleSelectDay(value: Date) {
		setDate(value);
	}

	function handleFilterChange(filterValue: GamesFilter | null) {
		setFilter(filterValue);
	}

	async function handleFetchGames(dateValue: Date, filterValue: GamesFilter | null) {
		setGames(null);

		abortControllerRef.current = new AbortController();

		const params: FetchNBAAPIParams = {
			startTime: dateToUnixTimeSeconds(dateStartOfDay(dateValue)),
			endTime: dateToUnixTimeSeconds(dateEndOfDay(dateValue)),
		};

		if (filterValue) {
			if (filterValue.teams) {
				params["teams"] = filterValue.teams.join(",");
			}

			if (filterValue.status) {
				params["status"] = filterValue.status;
			}
		}

		try {
			const response = await fetchNBAAPI<NBAAPIGame>("/games", {
				signal: abortControllerRef.current.signal,
				params,
			});

			setGames(response.data ?? []);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "The user aborted a request.") {
					setGames(null);
				} else {
					setGames(error.message);
				}
			} else {
				setGames("An unknown error occurred");
			}
		}
	}

	useEffect(() => {
		setDate(new Date());
	}, []);

	useEffect(() => {
		document.documentElement.scrollTop = 0;
	}, [games]);

	useEffect(() => {
		if (date === null) return;

		abortControllerRef.current.abort();

		void handleFetchGames(date, filter);
	}, [date, filter?.status, filter?.teams]);

	return (
		<div className="flex flex-col items-center justify-center gap-8 pb-4 pt-20 sm:px-8 sm:pt-6 md:pb-8">
			<ScheduleControls
				date={date}
				filter={filter}
				onDateSelect={handleSelectDay}
				onFilterChange={handleFilterChange}
			/>
			{games === null ? (
				<Games games={new Array(6).fill(undefined)} className="size-full px-4 sm:px-0" />
			) : typeof games === "string" ? (
				<p className="text-red-500">{games}</p>
			) : games.length === 0 ? (
				<p className="text-gray-500">No games scheduled</p>
			) : (
				<Games games={games} className="size-full px-4 sm:px-0" />
			)}
		</div>
	);
}
