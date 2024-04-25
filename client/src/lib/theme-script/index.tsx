/* eslint-disable react/no-danger */
export function ThemeScript() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `(${themeScript.toString()})()`,
			}}
		/>
	);
}

function themeScript() {
	const theme = localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	if (theme === null || theme === "system") {
		if (prefersDark) {
			document.documentElement.dataset.theme = "synthwave";
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.dataset.theme = "cupcake";
			document.documentElement.classList.remove("dark");
		}

		return;
	}

	if (theme === "dark") {
		document.documentElement.dataset.theme = "synthwave";
		document.documentElement.classList.add("dark");

		return;
	}

	document.documentElement.dataset.theme = "cupcake";
	document.documentElement.classList.remove("dark");
}
