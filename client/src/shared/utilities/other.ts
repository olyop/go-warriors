/* eslint-disable unicorn/prefer-dom-node-remove */
export function getScrollbarWidth(element: HTMLElement | null) {
	if (element && element.scrollHeight === element.clientHeight) {
		return 0;
	}

	// default to Chrome scrollbar width
	if (typeof document === "undefined") {
		return 0;
	}

	// Creating invisible container
	const outer = document.createElement("div");
	outer.style.visibility = "hidden";
	outer.style.overflow = "scroll"; // forcing scrollbar to appear
	// @ts-expect-error
	outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
	document.body.append(outer);

	// Creating inner element and placing it in the container
	const inner = document.createElement("div");
	outer.append(inner);

	// Calculating difference between container's full width and the child width
	const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

	// Removing temporary elements from the DOM
	outer.parentNode?.removeChild(outer);

	return scrollbarWidth;
}
