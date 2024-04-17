import { Dispatch, SetStateAction, createContext } from "react";

export const ScoresContext = createContext<ScoresContextType>([] as unknown as ScoresContextType);

export type ScoresContextValue = Scores | null;

export type ScoresContextType = [ScoresContextValue, Dispatch<SetStateAction<ScoresContextValue>>];

export interface Scores {
	hide: boolean;
}
