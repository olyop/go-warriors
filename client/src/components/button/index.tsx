import cx from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps, Fragment, ReactHTML, ReactNode, createElement } from "react";

export function Button({
	type = "button",
	htmlFor,
	leftIcon,
	text,
	rightIcon,
	groupLeft = false,
	hideTextSm = false,
	className,
	spanClassName,
	iconClassName,
	textClassName,
	groupClassName,
	leftIconClassName,
	rightIconClassName,
	...props
}: ButtonProps) {
	const leftValue = (
		<Fragment>
			{leftIcon && leftIcon(cx("size-6", spanClassName, iconClassName, leftIconClassName))}
			{text && <span className={cx(hideTextSm ? "hidden" : "", spanClassName, textClassName)}>{text}</span>}
		</Fragment>
	);

	const rightValue = (
		<Fragment>{rightIcon && rightIcon(cx("size-6", spanClassName, iconClassName, rightIconClassName))}</Fragment>
	);

	return createElement(type, {
		type: "button",
		htmlFor,
		...props,
		className: cx(
			"btn motion-reduce:no-animation max-sm:!text-xs",
			text === undefined && (leftIcon || rightIcon) && "btn-circle",
			hideTextSm && "btn-circle",
			className,
		),
		children: (
			<Fragment>
				{groupLeft ? <div className={groupClassName}>{leftValue}</div> : leftValue}
				{rightValue}
			</Fragment>
		),
	});
}

export interface ButtonProps extends ButtonInternalProps {
	type?: keyof ReactHTML;
	htmlFor?: string;
	leftIcon?: (iconClassName: string) => ReactNode;
	text?: ReactNode;
	rightIcon?: (iconClassName: string) => ReactNode;
	groupLeft?: boolean;
	hideTextSm?: boolean;
	className?: string | undefined;
	spanClassName?: string | undefined;
	iconClassName?: string | undefined;
	textClassName?: string | undefined;
	groupClassName?: string | undefined;
	leftIconClassName?: string | undefined;
	rightIconClassName?: string | undefined;
}

type ButtonInternalProps = Omit<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	"children" | "className" | "type"
>;
