"use client";

import { ComputerDesktopIcon, MoonIcon, PaintBrushIcon, SunIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

import { Button } from "@/components/button";
import { Modal, useModal } from "@/components/modal";
import { Theme } from "@/shared/types";

export default function HeaderThemeSwitcher() {
	const [isModalOpen, openModal, closeModal] = useModal();

	// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unnecessary-condition
	const [theme, setTheme] = useState<Theme>(global.window?.__theme || "system");

	function handleSelectTheme(value: Theme) {
		return () => {
			setTheme(value);

			console.log(global.window);

			// eslint-disable-next-line no-underscore-dangle
			global.window.__setPreferredTheme(value);

			closeModal();
		};
	}

	return (
		<Fragment>
			<Button
				className="btn-ghost"
				onClick={openModal}
				text="Theme"
				leftIcon={iconClassName =>
					theme === "system" ? (
						<ComputerDesktopIcon className={iconClassName} />
					) : theme === "light" ? (
						<SunIcon className={iconClassName} />
					) : (
						<MoonIcon className={iconClassName} />
					)
				}
			/>
			<Modal
				disableMinWidth
				open={isModalOpen}
				title="Select Theme"
				icon={iconClassName => <PaintBrushIcon className={iconClassName} />}
				onClose={closeModal}
				contentClassName="flex flex-col gap-4"
				content={
					<Fragment>
						<Button
							text="System"
							onClick={handleSelectTheme("system")}
							className={theme === "system" ? "btn-primary" : "btn-outline"}
							leftIcon={iconClassName => <ComputerDesktopIcon className={iconClassName} />}
						/>
						<Button
							text="Light"
							onClick={handleSelectTheme("light")}
							className={theme === "light" ? "btn-primary" : "btn-outline"}
							leftIcon={iconClassName => <SunIcon className={iconClassName} />}
						/>
						<Button
							text="Dark"
							onClick={handleSelectTheme("dark")}
							className={theme === "dark" ? "btn-primary" : "btn-outline"}
							leftIcon={iconClassName => <MoonIcon className={iconClassName} />}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
}
