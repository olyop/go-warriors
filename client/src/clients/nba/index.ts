/* eslint-disable no-continue */
import { formatDateToISO } from "@/shared/utilities/date";

import { NBAAPIResponse } from "./types";

export const fetchNBAAPI = async <T>(path: string, options?: FetchNBAAPIOptions) => {
	const hostname = "localhost";

	const url = new URL(`/api/v1${path}`, `http://${hostname}:8080`);

	if (options?.params) {
		for (const [key, objectValue] of Object.entries(options.params)) {
			if (objectValue === null) continue;

			let value: string;

			if (objectValue instanceof Date) {
				value = formatDateToISO(objectValue);
			} else {
				value = objectValue.toString();
			}

			url.searchParams.append(key, value.toString());
		}
	}

	const request = new Request(url, {
		cache: options?.enableCache ? "force-cache" : "no-cache",
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

export type FetchNBAAPIParams = Record<string, Date | string | number | null>;

export interface FetchNBAAPIOptions {
	enableCache?: boolean;
	params?: Record<string, Date | string | number | null>;
	signal?: AbortSignal;
}
