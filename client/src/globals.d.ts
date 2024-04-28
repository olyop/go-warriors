interface DOMStringMap {
	theme: string;
	scores: string;
}

declare namespace NodeJS {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	interface ProcessEnv {
		NEXTJS_PASSWORD: string;
	}
}
