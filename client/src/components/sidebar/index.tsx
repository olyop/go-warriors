import {
	ArrowTopRightOnSquareIcon,
	CalendarIcon,
	CodeBracketIcon,
	InformationCircleIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import logo from "../../assets/logo.png";
import { Button } from "../button";

export function Sidebar() {
	return (
		<div className="flex h-screen flex-col justify-between">
			<div className="flex flex-col">
				<div className="border-b-base-300 h-header flex items-center gap-4 border-b-2 px-2 py-2 sm:px-4">
					<Button
						type="label"
						htmlFor="my-drawer"
						className="btn-ghost"
						leftIcon={iconClassName => <XMarkIcon className={iconClassName} />}
					/>
				</div>
				<div className="border-b-base-300 flex flex-col items-center justify-center gap-2 border-b-2 pb-4">
					<Image src={logo as StaticImageData} alt="Logo" className="size-28" />
					<h1 className="text-xl">
						<b>Go Warriors</b>
					</h1>
				</div>
				<div className="flex flex-col justify-stretch px-2 py-4 sm:px-4">
					<Link href="/schedule">
						<Button
							text="Schedule"
							className="btn-ghost w-full"
							leftIcon={iconClassName => <CalendarIcon className={iconClassName} />}
						/>
					</Link>
				</div>
			</div>
			<div className="border-t-base-300 flex flex-col justify-stretch gap-2 border-t-2 px-2 py-4 sm:px-4">
				<Link
					target="_blank"
					rel="noopener noreferrer"
					href="https://oliverplummer.com.au/projects?open-section=go-warriors"
				>
					<Button
						text="About"
						className="btn-ghost w-full justify-between"
						leftIcon={iconClassName => <InformationCircleIcon className={iconClassName} />}
						rightIcon={iconClassName => <ArrowTopRightOnSquareIcon className={iconClassName} />}
					/>
				</Link>
				<Link target="_blank" rel="noopener noreferrer" href="https://github.com/olyop/go-warriors">
					<Button
						text="Source Code"
						className="btn-ghost w-full justify-between"
						leftIcon={iconClassName => <CodeBracketIcon className={iconClassName} />}
						rightIcon={iconClassName => <ArrowTopRightOnSquareIcon className={iconClassName} />}
					/>
				</Link>
			</div>
		</div>
	);
}
