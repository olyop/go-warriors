export interface NBAAPIResponse<T> {
	data: T[] | null;
}

export interface NBAAPIPlayer {
	playerID: number;
	firstName: string;
	lastName: string;
}

export interface NBAAPIGame {
	gameID: number;
	startTime: number;
	status: NBAAPIGameStatus;
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
	score: NBAAPIScore;
	players: NBAAPIGamePlayer[];
	statistics: NBAGamesStatisticsResponse;
}

export interface NBAAPIScore {
	points: number;
}

export interface NBAAPIGamePlayer {
	player: NBAAPIPlayer;
	statistics: NBAPlayerStatisticsResponse;
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

export interface NBAGamesStatisticsResponse {
	fastBreakPoints: number;
	pointsInPaint: number;
	biggestLead: number;
	secondChancePoints: number;
	pointsOffTurnovers: number;
	longestRun: number;
	points: number;
	fieldGoalsMade: number;
	fieldGoalsAttempted: number;
	fieldGoalPercentage: number;
	freeThrowsMade: number;
	freeThrowsAttempted: number;
	freeThrowPercentage: number;
	threePointersMade: number;
	threePointersAttempted: number;
	threePointPercentage: number;
	offensiveRebounds: number;
	defensiveRebounds: number;
	totalRebounds: number;
	assists: number;
	personalFouls: number;
	steals: number;
	turnovers: number;
	blocks: number;
}

export interface NBAPlayerStatisticsResponse {
	points: number;
	position: string;
	minutes: string;
	fieldGoalsMade: number;
	fieldGoalsAttempted: number;
	fieldGoalPercentage: number;
	freeThrowsMade: number;
	freeThrowsAttempted: number;
	freeThrowPercentage: number;
	threePointersMade: number;
	threePointersAttempted: number;
	threePointPercentage: number;
	offensiveRebounds: number;
	defensiveRebounds: number;
	totalRebounds: number;
	assists: number;
	personalFouls: number;
	steals: number;
	turnovers: number;
	blocks: number;
	plusMinus: string;
	comment: string;
}
