export type NBAAPIGamesResponse<T> = NBAAPIResponse<T>;

export interface NBAAPIResponse<T> {
	data: T[] | null;
}

export interface NBAAPIGame {
	gameID: number;
	startTime: number;
	status?: NBAAPIGameStatus;
	home: NBAAPIGameTeam;
	away: NBAAPIGameTeam;
}

export interface NBAAPIGameStatus {
	status: string;
	period: number;
	clock: string;
}

export interface NBAAPIGameTeam {
	team: NBAAPITeam;
	score?: NBAAPIScore;
}

export interface NBAAPITeam {
	teamID: number;
	code: string;
	name: string;
	nickname: string;
	logo: string;
	conference: string;
	division: string;
}

export interface NBAAPIScore {
	points: number;
}
