/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { Fragment, useEffect, useRef, useState } from "react";

import { Button } from "@/components/button";
import { Theme } from "@/shared/types";

import { Modal, useModal } from "../modal";

export default function HeaderThemeSwitcher() {
	const initializedValue = useRef(false);

	const [theme, setTheme] = useState<Theme | null>(null);
	const [isModalOpen, openModal, closeModal] = useModal();

	function handleSelectTheme(value: Theme) {
		return () => {
			setTheme(value);

			closeModal();
		};
	}

	useEffect(() => {
		if (theme === null) return;

		if (theme === "dark") {
			document.documentElement.dataset["theme"] = "synthwave";
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.dataset["theme"] = "cupcake";
			document.documentElement.classList.remove("dark");
		}

		if (initializedValue.current) {
			initializedValue.current = false;
			return;
		}

		localStorage.setItem("theme", theme);
	}, [theme]);

	useEffect(() => {
		initializedValue.current = true;
		setTheme(localStorage.getItem("theme") as Theme);
	}, []);

	if (!theme) return null;

	return (
		<Fragment>
			<Button
				hideTextSm
				text="Theme"
				className="btn-ghost"
				onClick={openModal}
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
				hideCloseButton
				open={isModalOpen}
				onClose={closeModal}
				boxClassName="!rounded-none"
				modalContentClassName="!p-0"
				contentClassName="flex flex-col !pr-0"
				content={
					<Fragment>
						<Button
							text="System"
							onClick={handleSelectTheme("system")}
							leftIcon={iconClassName => <ComputerDesktopIcon className={iconClassName} />}
							className={cx("rounded-none", theme === "system" ? "btn-primary" : "btn-ghost")}
						/>
						<Button
							text="Light"
							onClick={handleSelectTheme("light")}
							leftIcon={iconClassName => <SunIcon className={iconClassName} />}
							className={cx("rounded-none", theme === "light" ? "btn-primary" : "btn-ghost")}
						/>
						<Button
							text="Dark"
							onClick={handleSelectTheme("dark")}
							leftIcon={iconClassName => <MoonIcon className={iconClassName} />}
							className={cx("rounded-none", theme === "dark" ? "btn-primary" : "btn-ghost")}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
}
