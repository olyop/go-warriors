/* eslint-disable jsx-a11y/label-has-associated-control */
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { Button } from "@/components/button";

import logo from "../../assets/logo.png";
import { HeaderDynamicButtons } from "./dynamic-buttons";

export function Header() {
	return (
		<header className="h-header navbar bg-base-100 border-b-base-300 fixed z-30 flex w-screen items-center justify-between py-0 pl-2 pr-0 sm:border-b-2 sm:pl-4">
			<div className="flex items-center gap-2">
				<Button
					type="label"
					htmlFor="my-drawer"
					className="btn-ghost drawer-button"
					leftIcon={iconClassName => <Bars3Icon className={iconClassName} />}
				/>
				<div className="flex items-center gap-6">
					<Link href="/schedule">
						<Image src={logo as StaticImageData} alt="Logo" className="size-16" />
					</Link>
					<h1 className="text-xl">
						<b>Schedule</b>
					</h1>
				</div>
			</div>
			<HeaderDynamicButtons />
		</header>
	);
}
