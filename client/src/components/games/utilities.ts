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

export function teamColorSwitch(code: string, to: boolean) {
	return teamSwitch(code, {
		atlantaHawks: to
			? "!to-nbaTeamAtlantaHawks/30 dark:!to-nbaTeamAtlantaHawks/60"
			: "!from-nbaTeamAtlantaHawks/30 dark:!from-nbaTeamAtlantaHawks/60",
		bostonCeltics: to
			? "!to-nbaTeamBostonCeltics/30 dark:!to-nbaTeamBostonCeltics/60"
			: "!from-nbaTeamBostonCeltics/30 dark:!from-nbaTeamBostonCeltics/60",
		brooklynNets: to
			? "!to-nbaTeamBrooklynNets/30 dark:!to-nbaTeamBrooklynNets/60"
			: "!from-nbaTeamBrooklynNets/30 dark:!from-nbaTeamBrooklynNets/60",
		charlotteHornets: to
			? "!to-nbaTeamCharlotteHornets/30 dark:!to-nbaTeamCharlotteHornets/60"
			: "!from-nbaTeamCharlotteHornets/30 dark:!from-nbaTeamCharlotteHornets/60",
		chicagoBulls: to
			? "!to-nbaTeamChicagoBulls/30 dark:!to-nbaTeamChicagoBulls/60"
			: "!from-nbaTeamChicagoBulls/30 dark:!from-nbaTeamChicagoBulls/60",
		clevelandCavaliers: to
			? "!to-nbaTeamClevelandCavaliers/30 dark:!to-nbaTeamClevelandCavaliers/60"
			: "!from-nbaTeamClevelandCavaliers/30 dark:!from-nbaTeamClevelandCavaliers/60",
		dallasMavericks: to
			? "!to-nbaTeamDallasMavericks/30 dark:!to-nbaTeamDallasMavericks/60"
			: "!from-nbaTeamDallasMavericks/30 dark:!from-nbaTeamDallasMavericks/60",
		denverNuggets: to
			? "!to-nbaTeamDenverNuggets/30 dark:!to-nbaTeamDenverNuggets/60"
			: "!from-nbaTeamDenverNuggets/30 dark:!from-nbaTeamDenverNuggets/60",
		detroitPistons: to
			? "!to-nbaTeamDetroitPistons/30 dark:!to-nbaTeamDetroitPistons/60"
			: "!from-nbaTeamDetroitPistons/30 dark:!from-nbaTeamDetroitPistons/60",
		goldenStateWarriors: to
			? "!to-nbaTeamGoldenStateWarriors/30 dark:!to-nbaTeamGoldenStateWarriors/60"
			: "!from-nbaTeamGoldenStateWarriors/30 dark:!from-nbaTeamGoldenStateWarriors/60",
		houstonRockets: to
			? "!to-nbaTeamHoustonRockets/30 dark:!to-nbaTeamHoustonRockets/60"
			: "!from-nbaTeamHoustonRockets/30 dark:!from-nbaTeamHoustonRockets/60",
		indianaPacers: to
			? "!to-nbaTeamIndianaPacers/30 dark:!to-nbaTeamIndianaPacers/60"
			: "!from-nbaTeamIndianaPacers/30 dark:!from-nbaTeamIndianaPacers/60",
		losAngelesClippers: to
			? "!to-nbaTeamLosAngelesClippers/30 dark:!to-nbaTeamLosAngelesClippers/60"
			: "!from-nbaTeamLosAngelesClippers/30 dark:!from-nbaTeamLosAngelesClippers/60",
		losAngelesLakers: to
			? "!to-nbaTeamLosAngelesLakers/30 dark:!to-nbaTeamLosAngelesLakers/60"
			: "!from-nbaTeamLosAngelesLakers/30 dark:!from-nbaTeamLosAngelesLakers/60",
		memphisGrizzlies: to
			? "!to-nbaTeamMemphisGrizzlies/30 dark:!to-nbaTeamMemphisGrizzlies/60"
			: "!from-nbaTeamMemphisGrizzlies/30 dark:!from-nbaTeamMemphisGrizzlies/60",
		miamiHeat: to
			? "!to-nbaTeamMiamiHeat/30 dark:!to-nbaTeamMiamiHeat/60 dark:!to-nbaTeamMiamiHeat/60"
			: "!from-nbaTeamMiamiHeat/30 dark:!from-nbaTeamMiamiHeat/60",
		milwaukeeBucks: to
			? "!to-nbaTeamMilwaukeeBucks/30 dark:!to-nbaTeamMilwaukeeBucks/60"
			: "!from-nbaTeamMilwaukeeBucks/30 dark:!from-nbaTeamMilwaukeeBucks/60",
		minnesotaTimberwolves: to
			? "!to-nbaTeamMinnesotaTimberwolves/30 dark:!to-nbaTeamMinnesotaTimberwolves/60"
			: "!from-nbaTeamMinnesotaTimberwolves/30 dark:!from-nbaTeamMinnesotaTimberwolves/60",
		newOrleansPelicans: to
			? "!to-nbaTeamNewOrleansPelicans/30 dark:!to-nbaTeamNewOrleansPelicans/60"
			: "!from-nbaTeamNewOrleansPelicans/30 dark:!from-nbaTeamNewOrleansPelicans/60",
		newYorkKnicks: to
			? "!to-nbaTeamNewYorkKnicks/30 dark:!to-nbaTeamNewYorkKnicks/60"
			: "!from-nbaTeamNewYorkKnicks/30 dark:!from-nbaTeamNewYorkKnicks/60",
		oklahomaCityThunder: to
			? "!to-nbaTeamOklahomaCityThunder/30 dark:!to-nbaTeamOklahomaCityThunder/60"
			: "!from-nbaTeamOklahomaCityThunder/30 dark:!from-nbaTeamOklahomaCityThunder/60",
		orlandoMagic: to
			? "!to-nbaTeamOrlandoMagic/30 dark:!to-nbaTeamOrlandoMagic/60"
			: "!from-nbaTeamOrlandoMagic/30 dark:!from-nbaTeamOrlandoMagic/60",
		philadelphia76ers: to
			? "!to-nbaTeamPhiladelphia76ers/30 dark:!to-nbaTeamPhiladelphia76ers/60"
			: "!from-nbaTeamPhiladelphia76ers/30 dark:!from-nbaTeamPhiladelphia76ers/60",
		phoenixSuns: to
			? "!to-nbaTeamPhoenixSuns/30 dark:!to-nbaTeamPhoenixSuns/60"
			: "!from-nbaTeamPhoenixSuns/30 dark:!from-nbaTeamPhoenixSuns/60",
		portlandTrailBlazers: to
			? "!to-nbaTeamPortlandTrailBlazers/30 dark:!to-nbaTeamPortlandTrailBlazers/60"
			: "!from-nbaTeamPortlandTrailBlazers/30 dark:!from-nbaTeamPortlandTrailBlazers/60",
		sacramentoKings: to
			? "!to-nbaTeamSacramentoKings/30 dark:!to-nbaTeamSacramentoKings/60"
			: "!from-nbaTeamSacramentoKings/30 dark:!from-nbaTeamSacramentoKings/60",
		sanAntonioSpurs: to
			? "!to-nbaTeamSanAntonioSpurs/30 dark:!to-nbaTeamSanAntonioSpurs/60"
			: "!from-nbaTeamSanAntonioSpurs/30 dark:!from-nbaTeamSanAntonioSpurs/60",
		torontoRaptors: to
			? "!to-nbaTeamTorontoRaptors/30 dark:!to-nbaTeamTorontoRaptors/60"
			: "!from-nbaTeamTorontoRaptors/30 dark:!from-nbaTeamTorontoRaptors/60",
		utahJazz: to
			? "!to-nbaTeamUtahJazz/30 dark:!to-nbaTeamUtahJazz/60"
			: "!from-nbaTeamUtahJazz/30 dark:!from-nbaTeamUtahJazz/60",
		washingtonWizards: to
			? "!to-nbaTeamWashingtonWizards/30 dark:!to-nbaTeamWashingtonWizards/60"
			: "!from-nbaTeamWashingtonWizards/30 dark:!from-nbaTeamWashingtonWizards/60",
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
