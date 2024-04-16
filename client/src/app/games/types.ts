import { NBAAPIGame } from "@/clients/nba/types";

export type GamesState = NBAAPIGame[] | string | null;

export interface GamesFilter {
	status: string | null;
	teams: number[] | null;
}
