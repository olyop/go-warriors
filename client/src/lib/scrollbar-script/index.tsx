import Script from "next/script";

export function ScrollbarScript() {
	return (
		<Script
			strategy="lazyOnload"
			dangerouslySetInnerHTML={{
				__html: `(${scrollbarWidthScript.toString()})()`,
			}}
		/>
	);
}

function scrollbarWidthScript() {
	let scrollbarWidth: number;

	const element = document.documentElement as HTMLHtmlElement;

	if (element.scrollWidth === element.clientWidth) {
		scrollbarWidth = 0;
	}

	// Creating invisible container
	const outer = document.createElement("div");
	outer.style.visibility = "hidden";
	outer.style.overflow = "scroll"; // forcing scrollbar to appear
	document.body.append(outer);

	// Creating inner element and placing it in the container
	const inner = document.createElement("div");
	outer.append(inner);

	// Calculating difference between container's full width and the child width
	scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

	// Removing temporary elements from the DOM
	// eslint-disable-next-line unicorn/prefer-dom-node-remove
	outer.parentNode?.removeChild(outer);

	document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
}
