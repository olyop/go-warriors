"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";

export default function ScoreSwitcher() {
	const [scores, setScores] = useState(true);

	function handleToggleScores() {
		setScores(prevState => !prevState);
		document.documentElement.dataset.scores = document.documentElement.dataset.scores === "true" ? "false" : "true";
		localStorage.setItem("gowarriors-scores", document.documentElement.dataset.scores);
	}

	useEffect(() => {
		setScores(document.documentElement.dataset.scores === "true");
	}, []);

	return (
		<Button
			hideTextSm
			text="Scores"
			onClick={handleToggleScores}
			className={scores ? "btn-ghost" : "btn-primary"}
			leftIcon={iconClassName =>
				scores ? <EyeIcon className={iconClassName} /> : <EyeSlashIcon className={iconClassName} />
			}
		/>
	);
}
