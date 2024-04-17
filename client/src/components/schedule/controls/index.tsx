import {
	AdjustmentsHorizontalIcon,
	CalendarIcon,
	CheckIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { Button as SharedButton } from "@/components/button";
import { Modal, useModal } from "@/components/modal";

import { GamesFilter } from "../types";
import { ScheduleControlsCalendar as Calendar } from "./calendar";
import { ScheduleControlsContainer as Container } from "./container";
import { ScheduleControlsButton as ControlButton } from "./control-button";
import { ScheduleControlsFilter as Filter } from "./filter";
import { ScheduleControlsFilterButtons as FilterButtons } from "./filter/buttons";
import { ScheduleControlsWeekDays as WeekDays } from "./week";

export function ScheduleControls({
	date,
	filter: filterParent,
	onDateSelect,
	onFilterChange,
}: Readonly<ScheduleControlsProps>) {
	const [startingWeek, setStartingWeek] = useState(0);
	const [filter, setFilter] = useState<GamesFilter | null>(filterParent);

	const [isFilterModalOpen, openFilterModal, closeFilterModal] = useModal();
	const [isCalendarModalOpen, openCalendarModal, closeCalendarModal] = useModal();

	function handleBackOneWeek() {
		setStartingWeek(prevState => prevState - 1);
	}

	function handleForwardOneWeek() {
		setStartingWeek(prevState => prevState + 1);
	}

	function handleSelectDay(value: Date) {
		return () => {
			onDateSelect(value);
		};
	}

	function handleDateSelect(value: Date, week: number) {
		setStartingWeek(week);
		onDateSelect(value);
		closeCalendarModal();
	}

	function handleFilterCancel() {
		setFilter(filterParent);
		closeFilterModal();
	}

	function handleStatusSelect(status: string) {
		setFilter(prevState => ({
			teams: prevState?.teams ?? null,
			status: status === prevState?.status ? null : status,
		}));
	}

	function handleTeamChoose(teamID: number) {
		setFilter(prevState => {
			const status = prevState?.status ?? null;

			const teams =
				prevState === null
					? [teamID]
					: prevState.teams === null
						? [teamID]
						: prevState.teams.includes(teamID)
							? prevState.teams.filter(id => id !== teamID)
							: [...prevState.teams, teamID];

			if (teams.length === 0) {
				return {
					teams: null,
					status,
				};
			}

			return {
				teams,
				status,
			};
		});
	}

	function handleTeamsChoose(teamIDs: number[]) {
		setFilter(prevState => {
			const status = prevState?.status ?? null;

			const teams =
				prevState === null
					? teamIDs
					: prevState.teams === null
						? teamIDs
						: prevState.teams.every(id => teamIDs.includes(id))
							? null
							: teamIDs;

			return {
				status,
				teams,
			};
		});
	}

	function handleFilterApply() {
		closeFilterModal();
		onFilterChange(filter);
	}

	function handleFilterReset() {
		onFilterChange(null);
		closeFilterModal();
	}

	useEffect(() => {
		setFilter(filterParent);

		return () => {
			setFilter(filterParent);
			setStartingWeek(0);
		};
	}, [filterParent?.status, filterParent?.teams]);

	return (
		<Container>
			<ControlButton
				text="Cal"
				onClick={openCalendarModal}
				icon={iconClassName => <CalendarIcon className={iconClassName} />}
			/>
			<Modal
				title="Calendar"
				open={isCalendarModalOpen}
				onClose={closeCalendarModal}
				icon={iconClassName => <CalendarIcon className={iconClassName} />}
				content={<Calendar onDateChange={handleDateSelect} startingWeek={startingWeek} />}
				buttons={
					<SharedButton
						onClick={closeCalendarModal}
						className="btn-success"
						text="Done"
						leftIcon={iconClassName => <CheckIcon className={iconClassName} />}
					/>
				}
			/>
			<ControlButton
				text="Prev"
				className="hidden sm:flex"
				onClick={handleBackOneWeek}
				icon={iconClassName => <ChevronLeftIcon className={iconClassName} />}
			/>
			<WeekDays date={date} startingWeek={startingWeek} onSelectDay={handleSelectDay} />
			<ControlButton
				text="Next"
				className="hidden sm:flex"
				onClick={handleForwardOneWeek}
				icon={iconClassName => <ChevronRightIcon className={iconClassName} />}
			/>
			<ControlButton
				text="Filter"
				removeButtonGhost
				onClick={openFilterModal}
				className={filterParent === null ? "btn-ghost" : "btn-neutral"}
				icon={iconClassName => <AdjustmentsHorizontalIcon className={iconClassName} />}
			/>
			<Modal
				title="Filter"
				open={isFilterModalOpen}
				onClose={handleFilterCancel}
				content={
					<Filter
						filter={filter}
						onStatusSelect={handleStatusSelect}
						onTeamSelect={handleTeamChoose}
						onTeamsSelect={handleTeamsChoose}
					/>
				}
				icon={iconClassName => <AdjustmentsHorizontalIcon className={iconClassName} />}
				buttons={
					<FilterButtons onApply={handleFilterApply} onReset={handleFilterReset} onCancel={handleFilterCancel} />
				}
			/>
		</Container>
	);
}

export interface ScheduleControlsProps {
	date: Date | null;
	filter: GamesFilter | null;
	onFilterChange: (filter: GamesFilter | null) => void;
	onDateSelect: (value: Date) => void;
}
