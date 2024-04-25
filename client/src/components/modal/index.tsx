"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-autofocus, jsx-a11y/click-events-have-key-events, max-len */
import { XMarkIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { Fragment, MouseEvent, ReactNode, createElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/button";

export function Modal({
	open,
	title,
	icon,
	content,
	buttons,
	onClose,
	hideCloseButton = false,
	disableMinWidth = false,
	disableCloseOnEscape = false,
	boxClassName,
	modalContentClassName,
	contentClassName,
	buttonsClassName,
}: ModalProps) {
	const [mounted, setMounted] = useState(false);

	const contentRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const escapePress = useKeyPress("Escape");

	function handleClose() {
		if (onClose && !disableCloseOnEscape) {
			onClose();
		}
	}

	function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
		if (event.target !== dialogRef.current) return;

		handleClose();
	}

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!escapePress) return;

		handleClose();
	}, [escapePress]);

	useEffect(() => {
		if (contentRef.current === null) return;

		contentRef.current.scrollTop = 0;
	}, [open]);

	if (!mounted) {
		return null;
	}

	const marginRight =
		contentRef.current && contentRef.current.scrollHeight > contentRef.current.clientHeight
			? "mr-[var(--scrollbar-width)]"
			: null;

	return createPortal(
		<dialog open={open} ref={dialogRef} onMouseDown={handleDialogClick} className="modal z-50 backdrop-blur-2xl">
			<div
				className={cx(
					"modal-box z-100 rounded-box relative overflow-visible p-0",
					disableMinWidth ? "w-auto !min-w-0" : "sm:!min-w-[55rem]",
					boxClassName,
				)}
			>
				{hideCloseButton || (
					<Button
						onClick={handleClose}
						leftIcon={iconClassName => <XMarkIcon className={iconClassName} />}
						textClassName="flex items-center gap-3 justify-center"
						className="max-sm:btn-ghost sm:btn-neutral absolute right-4 top-[1rem] h-auto min-h-0 items-center justify-center gap-2 px-0 uppercase leading-none sm:-right-6 sm:-top-6 sm:gap-3 sm:!px-4 sm:!py-3 sm:px-3 sm:py-2"
						text={
							<Fragment>
								<span className="-mt- pr-1 leading-none sm:pr-0">Close</span>
								<span className="hidden rounded border px-1 py-0.5 text-[0.8rem] sm:block">ESC</span>
							</Fragment>
						}
					/>
				)}
				<div
					className={cx("flex flex-col gap-4 overflow-y-auto py-4 !pr-0 pl-4 sm:gap-8 sm:p-8", modalContentClassName)}
				>
					{title !== undefined && icon !== undefined && (
						<div suppressHydrationWarning className={cx("flex items-center gap-2 pr-4 sm:gap-4 sm:pr-8", marginRight)}>
							{icon("size-6 sm:size-8")}
							<h1 className="text-xl sm:text-2xl">{title}</h1>
						</div>
					)}
					{content && (
						<div
							ref={contentRef}
							className={cx(
								"max-h-[calc(100vh-20rem)] overflow-y-auto overflow-x-hidden pr-4 sm:max-h-[calc(100vh-25rem)] sm:pr-8",
								contentClassName,
							)}
						>
							{content}
						</div>
					)}
					{buttons && (
						<div
							suppressHydrationWarning
							className={cx("flex items-center justify-end gap-2 pr-4 sm:pr-8", marginRight, buttonsClassName)}
						>
							{buttons}
						</div>
					)}
				</div>
			</div>
		</dialog>,
		document.body,
	);
}

export function useModal(onClose?: () => void, defaultValue = false) {
	const [isOpen, setIsOpen] = useState(defaultValue);

	const handleModalOpen = () => {
		setIsOpen(true);
	};

	const handleModalClose = () => {
		if (onClose) {
			onClose();
		}

		setIsOpen(false);
	};

	return [isOpen, handleModalOpen, handleModalClose] as const;
}

function useKeyPress(targetKey: KeyboardEvent["key"]) {
	let prevKey = "";

	const [keyPressed, setKeyPressed] = useState(false);

	const downHandler = (event: KeyboardEvent) => {
		if (prevKey === targetKey) return;
		if (event.key === targetKey) {
			event.preventDefault();
			setKeyPressed(true);
			prevKey = event.key;
		}
	};

	const upHandler = (event: KeyboardEvent) => {
		if (event.key === targetKey) {
			event.preventDefault();
			setKeyPressed(false);
			prevKey = "";
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", downHandler);
		window.addEventListener("keyup", upHandler);
		return () => {
			window.removeEventListener("keydown", downHandler);
			window.removeEventListener("keyup", upHandler);
		};
	}, []);

	return keyPressed;
}

interface ModalProps {
	open: boolean;
	title?: string;
	icon?: (iconClassName: string) => ReactNode;
	content?: ReactNode | undefined;
	buttons?: ReactNode;
	onClose?: () => void;
	hideCloseButton?: boolean;
	disableMinWidth?: boolean;
	disableCloseOnEscape?: boolean;
	boxClassName?: string | undefined;
	modalContentClassName?: string | undefined;
	contentClassName?: string | undefined;
	buttonsClassName?: string | undefined;
}

export default Modal;
