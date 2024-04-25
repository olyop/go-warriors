import { ScheduleControlsCalendar as ControlsCalendar } from "./calendar";
import { ScheduleControlsContainer as ControlsContainer } from "./container";
import { ScheduleControlsFilter as ControlsFilter } from "./filter";
import { ScheduleControlsNavigator as ControlsNavigator } from "./navigator";

export function ScheduleControls() {
	return (
		<ControlsContainer>
			<ControlsCalendar />
			<ControlsNavigator />
			<ControlsFilter />
		</ControlsContainer>
	);
}
