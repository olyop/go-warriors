/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-autofocus, jsx-a11y/click-events-have-key-events, max-len */
import { XMarkIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { Fragment, MouseEvent, ReactNode, createElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/button";
import { getScrollbarWidth } from "@/shared/utilities/other";

export function Modal({
	open,
	title,
	icon,
	content,
	buttons,
	onClose,
	disableMinWidth = false,
	disableCloseOnEscape = false,
	contentClassName,
	buttonsClassName,
}: ModalProps) {
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
		if (!escapePress) return;

		handleClose();
	}, [escapePress]);

	useEffect(() => {
		if (contentRef.current === null) return;

		contentRef.current.scrollTop = 0;
	}, [open]);

	const scrollBarWidth = getScrollbarWidth(contentRef.current);

	return createPortal(
		<dialog
			open={open}
			ref={dialogRef}
			onMouseDown={handleDialogClick}
			className="modal z-50 backdrop-blur-2xl dark:backdrop-blur"
		>
			<div
				className={cx(
					"modal-box z-100 rounded-box relative overflow-visible p-0",
					disableMinWidth || "sm:!min-w-[45rem]",
				)}
			>
				<Button
					onClick={handleClose}
					leftIcon={iconClassName => <XMarkIcon className={iconClassName} />}
					textClassName="flex items-center gap-3 justify-center"
					className="btn-neutral absolute -right-2 -top-2 h-auto min-h-0 items-center justify-center gap-2 px-3 py-2 uppercase leading-none sm:-right-6 sm:-top-6 sm:gap-3 sm:!px-4 sm:!py-3"
					text={
						<Fragment>
							<span className="-mt-0.5 pr-1 leading-none sm:pr-0">Close</span>
							<span className="hidden rounded border px-1 py-0.5 text-[0.8rem] sm:block">ESC</span>
						</Fragment>
					}
				/>
				<div className="flex flex-col gap-4 overflow-y-auto py-4 !pr-0 pl-4 sm:gap-8 sm:p-8">
					{title !== undefined && icon !== undefined && (
						<div
							suppressHydrationWarning
							style={{ marginRight: content && scrollBarWidth > 0 ? `${scrollBarWidth}px` : undefined }}
							className={cx("flex items-center gap-2 sm:gap-4", scrollBarWidth === 0 && "pr-4 sm:pr-8")}
						>
							{icon("size-6 sm:size-8")}
							<h1 className="text-xl sm:text-2xl">{title}</h1>
						</div>
					)}
					{content && (
						<div
							ref={contentRef}
							className={cx(
								"max-h-[calc(100vh-20rem)] overflow-y-auto overflow-x-hidden pr-4 sm:max-h-[calc(100vh-25rem)] sm:gap-8 sm:pr-8",
								contentClassName,
							)}
						>
							{content}
						</div>
					)}
					{buttons && (
						<div
							suppressHydrationWarning
							style={{ marginRight: content && scrollBarWidth > 0 ? `${scrollBarWidth}px` : undefined }}
							className={cx("flex items-center justify-end gap-2 sm:gap-4", "pr-4 sm:pr-8", buttonsClassName)}
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
	disableMinWidth?: boolean;
	disableCloseOnEscape?: boolean;
	contentClassName?: string | undefined;
	buttonsClassName?: string | undefined;
}

export default Modal;
