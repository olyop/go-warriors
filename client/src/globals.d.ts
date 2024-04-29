interface DOMStringMap {
	theme: string;
	scores: string;
}

declare namespace NodeJS {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	interface ProcessEnv {
		API_BASE_URL: string;
		NEXTJS_PASSWORD: string;
	}
}
