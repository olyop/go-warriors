import { Games } from "@/components/games";

export default function Loading() {
	// eslint-disable-next-line unicorn/no-new-array
	return <Games games={new Array(12).fill(null)} />;
}
