"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";

import { NBAAPITeam } from "@/clients/nba/types";
import Modal, { useModal } from "@/components/modal";
import { GamesFilter, createGamesFilter } from "@/shared/utilities/games-filter";

import { ScheduleControlsButton as ControlButton } from "../control-button";
import { getDateFromPathname } from "../utilities";
import { ScheduleControlsFilterModalButtons as FilterModalButtons } from "./modal/buttons";
import { ScheduleControlsFilterModalContent as FilterModalContent } from "./modal/content";
import { createApplyLink } from "./modal/create-apply-link";

export function ScheduleControlsFilterInternal({ teams }: ScheduleControlsFilterInternalProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [isFilterModalOpen, openFilterModal, closeFilterModal] = useModal();

	const [filter, setFilter] = useState<GamesFilter>(createGamesFilter(searchParams));

	function handleStatusSelect(status: string) {
		setFilter(prevState => ({
			...prevState,
			status: prevState.status === status ? null : status,
		}));
	}

	function handleTeamChoose(teamID: number) {
		setFilter(prevState => {
			const teamsValue =
				prevState.teams === null
					? [String(teamID)]
					: prevState.teams.includes(String(teamID))
						? prevState.teams.filter(id => id !== String(teamID))
						: [...prevState.teams, String(teamID)];

			return {
				...prevState,
				teams: teamsValue.length === 0 ? null : teamsValue,
			};
		});
	}

	function handleFilterApply() {
		closeFilterModal();

		router.push(createApplyLink(getDateFromPathname(pathname), searchParams, filter));
	}

	function handleReset() {
		const filterValue = {
			status: null,
			teams: null,
		};

		setFilter(filterValue);
		closeFilterModal();
		router.push(createApplyLink(getDateFromPathname(pathname), searchParams, filterValue));
	}

	const isFilterActive = filter.status !== null || filter.teams !== null;

	return (
		<Fragment>
			<ControlButton
				text="Filter"
				removeButtonGhost
				onClick={openFilterModal}
				icon={iconClassName => <AdjustmentsHorizontalIcon className={iconClassName} />}
				className={cx(
					"border-0 max-sm:border-l-2 max-sm:border-t-2",
					isFilterActive
						? "dark:btn-primary dark:border-primary btn-neutral border-neutral"
						: "btn-ghost border-base-300",
				)}
			/>
			<Modal
				title="Filter"
				open={isFilterModalOpen}
				onClose={closeFilterModal}
				content={
					<FilterModalContent
						filter={filter}
						teams={teams}
						onStatusSelect={handleStatusSelect}
						onTeamSelect={handleTeamChoose}
					/>
				}
				icon={iconClassName => <AdjustmentsHorizontalIcon className={iconClassName} />}
				buttons={<FilterModalButtons onApply={handleFilterApply} onReset={handleReset} onCancel={closeFilterModal} />}
			/>
		</Fragment>
	);
}

interface ScheduleControlsFilterInternalProps {
	teams: NBAAPITeam[];
}
