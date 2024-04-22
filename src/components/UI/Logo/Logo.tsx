import { FC } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './Logo.module.scss';
import Link from 'next/link';

interface LogoProps {
	className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
	return (
		<Link href="/">
			<a className={classNames(styles.logo, className)}>
				{/*<Image unoptimized layout="fill" src="/logo.svg" alt="MovieSearch" />*/}
				<span className={classNames(styles.movie, className)}>
					Movie sdadasdas
				</span>
				<span className={classNames(styles.search, className)}>Search</span>
			</a>
		</Link>
	);
};
