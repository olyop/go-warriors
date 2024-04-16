/* eslint-disable no-continue */
import { NBAAPIResponse } from "./types";

export const fetchNBAAPI = async <T>(path: string, options: FetchNBAAPIOptions) => {
	const hostname = window.location.hostname === "localhost" ? "localhost" : "192.168.1.79";

	const url = new URL(`/api/v1${path}`, `https://${hostname}:8443`);

	if (options.params) {
		for (const [key, value] of Object.entries(options.params)) {
			if (value === null) continue;

			url.searchParams.append(key, value.toString());
		}
	}

	const request = new Request(url, {
		signal: options.signal ?? null,
		cache: options.enableCache ? "force-cache" : "no-store",
	});

	request.headers.set("Accept", "application/json");
	request.headers.set("Content-Type", "application/json");

	try {
		const response = await fetch(request);

		if (!response.ok) {
			throw new Error(`${response.status} ${response.statusText}`);
		}

		const data = (await response.json()) as NBAAPIResponse<T>;

		return data;
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : "Unknown error");
	}
};

export type FetchNBAAPIParams = Record<string, string | number | null>;

export interface FetchNBAAPIOptions {
	enableCache?: boolean;
	params?: Record<string, string | number | null>;
	signal?: AbortSignal;
}
