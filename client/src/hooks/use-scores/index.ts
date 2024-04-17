import { useContext } from "react";

import { ScoresContext } from "@/contexts/scores-context";

export function useScores() {
	return useContext(ScoresContext);
}
