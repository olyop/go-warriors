import { NBAAPITeam } from "@/clients/nba/types";

const EASTERN_CONFERENCE = "East";
const WESTERN_CONFERENCE = "West";

const ATLANTIC_DIVISION = "Atlantic";
const CENTRAL_DIVISION = "Central";
const SOUTHEAST_DIVISION = "Southeast";
const PACIFIC_DIVISION = "Pacific";
const SOUTHWEST_DIVISION = "Southwest";
const NORTHWEST_DIVISION = "Northwest";

export function splitTeamsByConferenceAndDivision(teams: NBAAPITeam[]): ConferencesAndDivisions {
	const conferences: ConferencesAndDivisions = [
		{
			name: EASTERN_CONFERENCE,
			divisions: [
				{
					name: ATLANTIC_DIVISION,
					teams: [] as unknown as DivisionTeams,
				},
				{
					name: CENTRAL_DIVISION,
					teams: [] as unknown as DivisionTeams,
				},
				{
					name: SOUTHEAST_DIVISION,
					teams: [] as unknown as DivisionTeams,
				},
			],
		},
		{
			name: WESTERN_CONFERENCE,
			divisions: [
				{
					name: PACIFIC_DIVISION,
					teams: [] as unknown as DivisionTeams,
				},
				{
					name: SOUTHWEST_DIVISION,
					teams: [] as unknown as DivisionTeams,
				},
				{
					name: NORTHWEST_DIVISION,
					teams: [] as unknown as DivisionTeams,
				},
			],
		},
	];

	for (const team of teams) {
		if (team.conference === EASTERN_CONFERENCE) {
			if (team.division === ATLANTIC_DIVISION) {
				conferences[0].divisions[0].teams.push(team);
			} else if (team.division === CENTRAL_DIVISION) {
				conferences[0].divisions[1].teams.push(team);
			} else if (team.division === SOUTHEAST_DIVISION) {
				conferences[0].divisions[2].teams.push(team);
			} else {
				throw new Error(`Unknown division: ${team.division}`);
			}
		} else if (team.conference === WESTERN_CONFERENCE) {
			if (team.division === PACIFIC_DIVISION) {
				conferences[1].divisions[0].teams.push(team);
			} else if (team.division === SOUTHWEST_DIVISION) {
				conferences[1].divisions[1].teams.push(team);
			} else if (team.division === NORTHWEST_DIVISION) {
				conferences[1].divisions[2].teams.push(team);
			} else {
				throw new Error(`Unknown division: ${team.division}`);
			}
		} else {
			throw new Error(`Unknown conference: ${team.conference}`);
		}
	}

	return conferences;
}

type ConferencesAndDivisions = [Conference, Conference];

interface Conference {
	name: string;
	divisions: [Division, Division, Division];
}

interface Division {
	name: string;
	teams: DivisionTeams;
}

type DivisionTeams = [NBAAPITeam, NBAAPITeam, NBAAPITeam, NBAAPITeam, NBAAPITeam];
