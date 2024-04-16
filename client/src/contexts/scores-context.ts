import { Dispatch, SetStateAction, createContext } from "react";

export const ScoresContext = createContext<ScoresContextType>([] as unknown as ScoresContextType);

export type ScoresContextType = [Scores, Dispatch<SetStateAction<Scores>>];

export interface Scores {
	hide: boolean;
}
