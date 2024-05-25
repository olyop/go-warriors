"use client";

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { Fragment, useEffect } from "react";

import { Button } from "@/components/button";
import { Theme } from "@/shared/types";

import { Modal, useModal } from "../modal";

export default function HeaderThemeSwitcher() {
	const [isModalOpen, openModal, closeModal] = useModal();

	function handleSelectTheme(value: Theme) {
		return () => {
			applyTheme(value);

			closeModal();
		};
	}

	function applyTheme(theme: Theme) {
		localStorage.setItem("gowarriors-theme", theme);

		if (theme === "system") {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

			if (prefersDark) {
				applyDarkTheme();
			} else {
				applyLightTheme();
			}

			return;
		}

		if (theme === "dark") {
			applyDarkTheme();

			return;
		}

		// default to light theme
		applyLightTheme();
	}

	function applyDarkTheme() {
		document.documentElement.dataset.theme = "synthwave";
		document.documentElement.classList.add("dark");
	}

	function applyLightTheme() {
		document.documentElement.dataset.theme = "cupcake";
		document.documentElement.classList.remove("dark");
	}

	function handlePrefersColorSchemeChange(theme: Theme) {
		return () => {
			if (theme !== "system") {
				return;
			}

			applyTheme(theme);
		};
	}

	useEffect(() => {
		const theme = localStorage.getItem("gowarriors-theme") as Theme;
		const listener = handlePrefersColorSchemeChange(theme);
		const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		darkModeMediaQuery.addEventListener("change", listener);
		applyTheme(theme);

		return () => {
			darkModeMediaQuery.removeEventListener("change", listener);
		};
	}, []);

	let theme: Theme;
	if (typeof window !== "undefined") {
		theme = (localStorage.getItem("gowarriors-theme") || "system") as Theme;
	} else {
		theme = "system";
	}

	return (
		<Fragment>
			<Button
				hideTextSm
				text="Theme"
				className="btn-ghost"
				onClick={openModal}
				leftIcon={iconClassName =>
					theme === "system" || theme === null ? (
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
				hideCloseButton
				open={isModalOpen}
				onClose={closeModal}
				modalContentClassName="!p-0"
				contentClassName="flex flex-col !pr-0"
				content={
					<Fragment>
						<Button
							text="System"
							onClick={handleSelectTheme("system")}
							leftIcon={iconClassName => <ComputerDesktopIcon className={iconClassName} />}
							className={cx(
								"rounded-t-box h-auto gap-4 rounded-none px-8 py-4",
								theme === "system" ? "btn-primary" : "btn-ghost",
							)}
						/>
						<Button
							text="Light"
							onClick={handleSelectTheme("light")}
							leftIcon={iconClassName => <SunIcon className={iconClassName} />}
							className={cx("h-auto gap-4 rounded-none px-8 py-4", theme === "light" ? "btn-primary" : "btn-ghost")}
						/>
						<Button
							text="Dark"
							onClick={handleSelectTheme("dark")}
							leftIcon={iconClassName => <MoonIcon className={iconClassName} />}
							className={cx(
								"rounded-b-box h-auto gap-4 rounded-none px-8 py-4",
								theme === "dark" ? "btn-primary" : "btn-ghost",
							)}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
}
