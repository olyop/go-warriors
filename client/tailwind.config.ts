import daisyui from "daisyui";
import { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	plugins: [daisyui],
	darkMode: "selector",
	daisyui: {
		logs: false,
		darkTheme: "night",
		themes: ["cupcake", "synthwave"],
	},
	theme: {
		extend: {
			padding: {
				header: "var(--header-height)",
			},
			margin: {
				header: "var(--header-height)",
			},
			height: {
				header: "var(--header-height)",
			},
			screens: {
				tiny: "350px",
			},
			colors: {
				nbaTeamAtlantaHawks: "#C8102E",
				nbaTeamBostonCeltics: "#007A33",
				nbaTeamBrooklynNets: "#000000",
				nbaTeamCharlotteHornets: "#00788C",
				nbaTeamChicagoBulls: "#CE1141",
				nbaTeamClevelandCavaliers: "#860038",
				nbaTeamDallasMavericks: "#00538C",
				nbaTeamDenverNuggets: "#FEC524",
				nbaTeamDetroitPistons: "#C8102E",
				nbaTeamGoldenStateWarriors: "#FFC72C",
				nbaTeamHoustonRockets: "#CE1141",
				nbaTeamIndianaPacers: "#002D62",
				nbaTeamLosAngelesClippers: "#C8102E",
				nbaTeamLosAngelesLakers: "#FDB927",
				nbaTeamMemphisGrizzlies: "#5D76A9",
				nbaTeamMiamiHeat: "#98002E",
				nbaTeamMilwaukeeBucks: "#236192",
				nbaTeamMinnesotaTimberwolves: "#236192",
				nbaTeamNewOrleansPelicans: "#C8102E",
				nbaTeamNewYorkKnicks: "#F58426",
				nbaTeamOklahomaCityThunder: "#007AC1",
				nbaTeamOrlandoMagic: "#0077C0",
				nbaTeamPhiladelphia76ers: "#006BB6",
				nbaTeamPhoenixSuns: "#E56020",
				nbaTeamPortlandTrailBlazers: "#E03A3E",
				nbaTeamSacramentoKings: "#5A2D81",
				nbaTeamSanAntonioSpurs: "#C4CED4",
				nbaTeamTorontoRaptors: "#CE1141",
				nbaTeamUtahJazz: "#002B5C",
				nbaTeamWashingtonWizards: "#002B5C",
			},
		},
	},
};

export default config;
