/* eslint-disable no-underscore-dangle */
import { Theme } from "@/shared/types";

declare global {
	interface Window {
		__theme: Theme;
		__onThemeChange: (theme: Theme) => void;
		__setPreferredTheme: (theme: Theme) => void;
	}
}

function code() {
	window.__onThemeChange = () => {};

	let preferredTheme;

	function setTheme(newTheme: Theme) {
		window.__theme = newTheme;
		preferredTheme = newTheme;
		document.documentElement.dataset["theme"] = newTheme === "dark" ? "synthwave" : "cupcake";

		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		window.__onThemeChange(newTheme);
	}

	try {
		preferredTheme = (localStorage.getItem("theme") || "system") as Theme;
	} catch {
		// Ignore
	}

	window.__setPreferredTheme = (newTheme: Theme) => {
		setTheme(newTheme);

		try {
			localStorage.setItem("theme", newTheme);
		} catch {
			// Ignore
		}
	};

	const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

	darkQuery.addEventListener("change", event => {
		window.__setPreferredTheme(event.matches ? "dark" : "light");
	});

	setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
}

export function ThemeScript() {
	// eslint-disable-next-line react/no-danger, @typescript-eslint/restrict-template-expressions
	return <script dangerouslySetInnerHTML={{ __html: `(${code})();` }} />;
}
