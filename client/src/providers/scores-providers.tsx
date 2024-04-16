"use client";

import { PropsWithChildren, useMemo, useState } from "react";

import { Scores, ScoresContext, ScoresContextType } from "@/contexts/scores-context";

export function ScoresProvider({ children }: PropsWithChildren) {
	const [scores, setScores] = useState<Scores>({
		hide: false,
	});

	const value = useMemo<ScoresContextType>(() => [scores, setScores], [scores, setScores]);

	return <ScoresContext.Provider value={value}>{children}</ScoresContext.Provider>;
}
