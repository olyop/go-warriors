/* eslint-disable no-undef */

const THEME_LOCAL_STORAGE_KEY = "theme";

const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

if (theme === "dark") {
	document.documentElement.dataset.theme = "synthwave";
	document.documentElement.classList.add("dark");
} else {
	document.documentElement.dataset.theme = "cupcake";
	document.documentElement.classList.remove("dark");
}
