export type Theme = "system" | "light" | "dark";

export interface ServerSideComponentProp<Params extends Record<string, string | string[] | undefined>> {
	params: Params;
	searchParams: URLSearchParams;
}
