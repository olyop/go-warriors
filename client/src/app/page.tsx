"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createElement, useEffect } from "react";

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		router.push("/schedule");
	}, []);

	return <Link href="/schedule">Schedule</Link>;
}
