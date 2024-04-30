"use client";

import { useRouter } from "next/navigation";
import { createElement, useEffect } from "react";

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		router.push("/schedule");
	}, []);

	return <div />;
}
