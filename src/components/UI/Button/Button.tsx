import { ButtonHTMLAttributes, memo, PropsWithChildren, ReactNode } from 'react';
import { ButtonBase } from '../ButtonBase/ButtonBase';
import classNames from 'classnames';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'stroke' | 'regular' | 'sm' | 'black';
	theme?: 'dark';
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	animationDuration?: number;
}

export const Button = memo<PropsWithChildren<ButtonProps>>(
	({
		children,
		theme,
		variant,
		startIcon = null,
		endIcon = null,
		className,
		animationDuration,
		...props
	}) => {
		return (
			<ButtonBase
				data-testid="button"
				ripple
				startIcon={startIcon}
				endIcon={endIcon}
				animationDuration={animationDuration}
				className={classNames(
					styles.btn,
					variant === 'stroke' && styles.stroke,
					variant === 'regular' && styles.regular,
					variant === 'sm' && styles.small,
					theme ==='dark' && styles.dark,
					className
				)}
				{...props}
			>
				{children}
			</ButtonBase>
		);
	}
);

Button.displayName = 'Button';
