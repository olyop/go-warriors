"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

import { Button } from "@/components/button";
import { ScoresContext } from "@/contexts/scores-context";

export default function ScoreSwitcher() {
	const [scores, setScores] = useContext(ScoresContext);

	function handleToggleScores() {
		setScores(prevScores => ({
			...prevScores,
			hide: !prevScores.hide,
		}));
	}

	return (
		<Button
			hideTextSm
			className="btn-ghost"
			onClick={handleToggleScores}
			text={`${scores.hide ? "Show" : "Hide"} Scores`}
			leftIcon={iconClassName =>
				scores.hide ? <EyeSlashIcon className={iconClassName} /> : <EyeIcon className={iconClassName} />
			}
		/>
	);
}
