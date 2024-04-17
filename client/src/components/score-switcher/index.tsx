import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/button";
import { useScores } from "@/hooks/use-scores";

export default function ScoreSwitcher() {
	const [scores, setScores] = useScores();

	function handleToggleScores() {
		setScores(prevScores =>
			prevScores === null
				? {
						hide: false,
					}
				: {
						...prevScores,
						hide: !prevScores.hide,
					},
		);
	}

	if (scores === null) {
		return null;
	}

	return (
		<Button
			hideTextSm
			text="Scores"
			onClick={handleToggleScores}
			className={scores.hide ? "btn-primary" : "btn-ghost"}
			leftIcon={iconClassName =>
				scores.hide ? <EyeSlashIcon className={iconClassName} /> : <EyeIcon className={iconClassName} />
			}
		/>
	);
}
