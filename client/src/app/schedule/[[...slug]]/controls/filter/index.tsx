import { ScheduleControlsFilterInternal } from "./internal";
import { retreiveTeams } from "./retreive-teams";

export async function ScheduleControlsFilter() {
	const teams = await retreiveTeams();

	return <ScheduleControlsFilterInternal teams={teams} />;
}
