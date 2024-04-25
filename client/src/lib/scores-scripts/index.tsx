/* eslint-disable react/no-danger */

export function ScoresScript() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `(${scoresScript.toString()})()`,
			}}
		/>
	);
}

function scoresScript() {
	const scores = localStorage.getItem("scores");

	if (scores === null) {
		document.documentElement.dataset.scores = "true";

		return;
	}

	if (scores === "false") {
		document.documentElement.dataset.scores = "false";

		return;
	}

	document.documentElement.dataset.scores = "true";
}
