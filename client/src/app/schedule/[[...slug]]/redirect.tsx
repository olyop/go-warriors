"use client";

import { useRouter } from "next/navigation";
import { Fragment, PropsWithChildren, useEffect } from "react";

export default function ScheduleRedirect({ date, slug, children }: PropsWithChildren<ScheduleRedirectProps>) {
	const router = useRouter();

	useEffect(() => {
		if (slug !== null) {
			return;
		}

		router.replace(`/schedule/${date.toISOString().slice(0, 10).replaceAll("-", "/")}`);
	}, []);

	return <Fragment>{children}</Fragment>;
}

export interface ScheduleRedirectProps {
	date: Date;
	slug: string[] | null;
}
