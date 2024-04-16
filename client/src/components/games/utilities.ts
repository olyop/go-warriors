import { NBAAPIGame } from "@/clients/nba/types";

export function splitTeamName(name: string | undefined) {
	if (!name) {
		return ["Loading...", "Loading..."];
	}

	const split = name.split(" ");

	// name is the last word
	const team = split.at(-1);

	// city it the rest
	const city = split.slice(0, -1).join(" ");

	return [city, team];
}

export function gameStatusSwitch<T>(game: NBAAPIGame, home: T, away: T, tied: T, pre: T) {
	if (game.home.score && game.away.score) {
		if (game.home.score.points === game.away.score.points) {
			return tied;
		} else if (game.home.score.points > game.away.score.points) {
			return home;
		} else {
			return away;
		}
	} else {
		return pre;
	}
}

export function teamColorSwitch(code: string) {
	return teamSwitch(code, {
		atlantaHawks: "!to-nbaTeamAtlantaHawks/30 dark:!to-nbaTeamAtlantaHawks/60",
		bostonCeltics: "!to-nbaTeamBostonCeltics/30 dark:!to-nbaTeamBostonCeltics/60",
		brooklynNets: "!to-nbaTeamBrooklynNets/30 dark:!to-nbaTeamBrooklynNets/60",
		charlotteHornets: "!to-nbaTeamCharlotteHornets/30 dark:!to-nbaTeamCharlotteHornets/60",
		chicagoBulls: "!to-nbaTeamChicagoBulls/30 dark:!to-nbaTeamChicagoBulls/60",
		clevelandCavaliers: "!to-nbaTeamClevelandCavaliers/30 dark:!to-nbaTeamClevelandCavaliers/60",
		dallasMavericks: "!to-nbaTeamDallasMavericks/30 dark:!to-nbaTeamDallasMavericks/60",
		denverNuggets: "!to-nbaTeamDenverNuggets/30 dark:!to-nbaTeamDenverNuggets/60",
		detroitPistons: "!to-nbaTeamDetroitPistons/30 dark:!to-nbaTeamDetroitPistons/60",
		goldenStateWarriors: "!to-nbaTeamGoldenStateWarriors/30 dark:!to-nbaTeamGoldenStateWarriors/60",
		houstonRockets: "!to-nbaTeamHoustonRockets/30 dark:!to-nbaTeamHoustonRockets/60",
		indianaPacers: "!to-nbaTeamIndianaPacers/30 dark:!to-nbaTeamIndianaPacers/60",
		losAngelesClippers: "!to-nbaTeamLosAngelesClippers/30 dark:!to-nbaTeamLosAngelesClippers/60",
		losAngelesLakers: "!to-nbaTeamLosAngelesLakers/30 dark:!to-nbaTeamLosAngelesLakers/60",
		memphisGrizzlies: "!to-nbaTeamMemphisGrizzlies/30 dark:!to-nbaTeamMemphisGrizzlies/60",
		miamiHeat: "!to-nbaTeamMiamiHeat/30 dark:!to-nbaTeamMiamiHeat/60 dark:!to-nbaTeamMiamiHeat/60",
		milwaukeeBucks: "!to-nbaTeamMilwaukeeBucks/30 dark:!to-nbaTeamMilwaukeeBucks/60",
		minnesotaTimberwolves: "!to-nbaTeamMinnesotaTimberwolves/30 dark:!to-nbaTeamMinnesotaTimberwolves/60",
		newOrleansPelicans: "!to-nbaTeamNewOrleansPelicans/30 dark:!to-nbaTeamNewOrleansPelicans/60",
		newYorkKnicks: "!to-nbaTeamNewYorkKnicks/30 dark:!to-nbaTeamNewYorkKnicks/60",
		oklahomaCityThunder: "!to-nbaTeamOklahomaCityThunder/30 dark:!to-nbaTeamOklahomaCityThunder/60",
		orlandoMagic: "!to-nbaTeamOrlandoMagic/30 dark:!to-nbaTeamOrlandoMagic/60",
		philadelphia76ers: "!to-nbaTeamPhiladelphia76ers/30 dark:!to-nbaTeamPhiladelphia76ers/60",
		phoenixSuns: "!to-nbaTeamPhoenixSuns/30 dark:!to-nbaTeamPhoenixSuns/60",
		portlandTrailBlazers: "!to-nbaTeamPortlandTrailBlazers/30 dark:!to-nbaTeamPortlandTrailBlazers/60",
		sacramentoKings: "!to-nbaTeamSacramentoKings/30 dark:!to-nbaTeamSacramentoKings/60",
		sanAntonioSpurs: "!to-nbaTeamSanAntonioSpurs/30 dark:!to-nbaTeamSanAntonioSpurs/60",
		torontoRaptors: "!to-nbaTeamTorontoRaptors/30 dark:!to-nbaTeamTorontoRaptors/60",
		utahJazz: "!to-nbaTeamUtahJazz/30 dark:!to-nbaTeamUtahJazz/60",
		washingtonWizards: "!to-nbaTeamWashingtonWizards/30 dark:!to-nbaTeamWashingtonWizards/60",
	});
}

function teamSwitch<T>(code: string, options: NBATeamSwitchOptions<T>) {
	switch (code) {
		case "ATL":
			return options.atlantaHawks;
		case "BOS":
			return options.bostonCeltics;
		case "BKN":
			return options.brooklynNets;
		case "CHA":
			return options.charlotteHornets;
		case "CHI":
			return options.chicagoBulls;
		case "CLE":
			return options.clevelandCavaliers;
		case "DAL":
			return options.dallasMavericks;
		case "DEN":
			return options.denverNuggets;
		case "DET":
			return options.detroitPistons;
		case "GSW":
			return options.goldenStateWarriors;
		case "HOU":
			return options.houstonRockets;
		case "IND":
			return options.indianaPacers;
		case "LAC":
			return options.losAngelesClippers;
		case "LAL":
			return options.losAngelesLakers;
		case "MEM":
			return options.memphisGrizzlies;
		case "MIA":
			return options.miamiHeat;
		case "MIL":
			return options.milwaukeeBucks;
		case "MIN":
			return options.minnesotaTimberwolves;
		case "NOP":
			return options.newOrleansPelicans;
		case "NYK":
			return options.newYorkKnicks;
		case "OKC":
			return options.oklahomaCityThunder;
		case "ORL":
			return options.orlandoMagic;
		case "PHI":
			return options.philadelphia76ers;
		case "PHX":
			return options.phoenixSuns;
		case "POR":
			return options.portlandTrailBlazers;
		case "SAC":
			return options.sacramentoKings;
		case "SAS":
			return options.sanAntonioSpurs;
		case "TOR":
			return options.torontoRaptors;
		case "UTA":
			return options.utahJazz;
		case "WAS":
			return options.washingtonWizards;
		default:
			return null;
	}
}

export interface NBATeamSwitchOptions<T> {
	atlantaHawks: T;
	bostonCeltics: T;
	brooklynNets: T;
	charlotteHornets: T;
	chicagoBulls: T;
	clevelandCavaliers: T;
	dallasMavericks: T;
	denverNuggets: T;
	detroitPistons: T;
	goldenStateWarriors: T;
	houstonRockets: T;
	indianaPacers: T;
	losAngelesClippers: T;
	losAngelesLakers: T;
	memphisGrizzlies: T;
	miamiHeat: T;
	milwaukeeBucks: T;
	minnesotaTimberwolves: T;
	newOrleansPelicans: T;
	newYorkKnicks: T;
	oklahomaCityThunder: T;
	orlandoMagic: T;
	philadelphia76ers: T;
	phoenixSuns: T;
	portlandTrailBlazers: T;
	sacramentoKings: T;
	sanAntonioSpurs: T;
	torontoRaptors: T;
	utahJazz: T;
	washingtonWizards: T;
}
