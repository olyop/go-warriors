"use client";

import { ArrowPathIcon, CalendarIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";

import { Button } from "@/components/button";
import Modal, { useModal } from "@/components/modal";

import { ScheduleControlsButton as ControlButton } from "../control-button";
import { createDayLink } from "../utilities";
import { ScheduleControlsCalendarContent as CalendarContent } from "./content";

export function ScheduleControlsCalendar() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isCalendarModalOpen, openCalendarModal, closeCalendarModal] = useModal();

	function handleReset() {
		closeCalendarModal();

		const today = new Date();

		router.push(createDayLink(today, searchParams));
	}

	return (
		<Fragment>
			<ControlButton
				text="Cal"
				onClick={openCalendarModal}
				className="border-base-300 btn-ghost border-0 max-sm:border-r-2 max-sm:border-t-2"
				icon={iconClassName => <CalendarIcon className={iconClassName} />}
			/>
			<Modal
				title="Calendar"
				open={isCalendarModalOpen}
				onClose={closeCalendarModal}
				icon={iconClassName => <CalendarIcon className={iconClassName} />}
				content={<CalendarContent onSelect={closeCalendarModal} />}
				buttons={
					<Fragment>
						<Button
							text="Reset"
							onClick={handleReset}
							className="btn-ghost"
							leftIcon={iconClassName => <ArrowPathIcon className={iconClassName} />}
						/>
						<Button
							text="Close"
							className="btn-ghost"
							onClick={closeCalendarModal}
							leftIcon={iconClassName => <XMarkIcon className={iconClassName} />}
						/>
						<Button
							text="Done"
							className="btn-success"
							onClick={closeCalendarModal}
							leftIcon={iconClassName => <CheckIcon className={iconClassName} />}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
}
