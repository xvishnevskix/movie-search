import { useActions } from '@/hooks/useActions';
import { Search } from '@/components/Search/Search';
import {useContext, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { Logo } from '@/UI/Logo/Logo';
import { Burger } from './components/Burger/Burger';
import { Dropdown } from './components/Dropdown/Dropdown';
import { RoutesEnum } from '@/constants/routes';
import styles from './Header.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import {useAuthState} from "react-firebase-hooks/auth";
import { Context } from 'src/pages/_app';

export const Header = () => {
	const ref = useRef(null);
	const { toggleMenu } = useActions();

	const {auth} = useContext(Context)
	const [user] = useAuthState(auth)

	useOnClickOutside(ref, () => toggleMenu(false));

	return (
		<header className={styles.header}>
			<div className={classNames('container', styles.container)}>
				<div ref={ref} className={styles.left}>
					<Burger />
					<Logo className={styles.logo} />
					<Dropdown />
				</div>
				<Search />

					{!user ?
						(<Link href={RoutesEnum.Login}>
							<a className={styles.link}>Войти</a>
						</Link>)
					:
						(<Link href={RoutesEnum.Home}>
							<a
								className={styles.link}
								onClick={() => auth.signOut()}>
								Выйти
							</a>
						</Link>)}
			</div>
		</header>
	);
};
