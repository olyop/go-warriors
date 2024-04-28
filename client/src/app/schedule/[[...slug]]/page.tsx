import { Games } from "@/components/games";
import { ServerSideComponentProp } from "@/shared/types";
import { createGamesFilter } from "@/shared/utilities/games-filter";

import { retrieveGames } from "./retrieve-games";
import { convertSlugToDate } from "./utilities";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Schedule(props: ServerSideComponentProp<{ slug: string[] | undefined }>) {
	const { params, searchParams } = props;

	const date = convertSlugToDate(params.slug ?? null);
	const filter = createGamesFilter(searchParams);

	const games = await retrieveGames(date, filter);

	return <Games games={games} />;
}
