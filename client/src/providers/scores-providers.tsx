"use client";

import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { Scores, ScoresContext, ScoresContextType, ScoresContextValue } from "@/contexts/scores-context";

const SCORES_LOCAL_STORAGE_KEY = "scores";

const DEFAULT_SCORES: Scores = {
	hide: false,
};

export function ScoresProvider({ children }: PropsWithChildren) {
	const [scores, setScores] = useState<ScoresContextValue>(null);

	useEffect(() => {
		if (scores === null) {
			// Initialize scores with stored scores
			setScores(retreiveStored());
		}

		storeScores(scores);
	}, [scores]);

	const value = useMemo(() => [scores, setScores] as ScoresContextType, [scores]);

	return <ScoresContext.Provider value={value}>{children}</ScoresContext.Provider>;
}

function retreiveStored(): Scores {
	const stored = localStorage.getItem(SCORES_LOCAL_STORAGE_KEY);

	return stored ? (JSON.parse(stored) as Scores) : DEFAULT_SCORES;
}

function storeScores(scores: ScoresContextValue) {
	localStorage.setItem(SCORES_LOCAL_STORAGE_KEY, JSON.stringify(scores));
}
