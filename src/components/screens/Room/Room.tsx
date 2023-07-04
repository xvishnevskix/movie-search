import { Chat } from './components/Chat/Chat';
import { useGetFilmByIdQuery } from '@/services/KinomoreService';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RoomHeader } from './components/RoomHeader/RoomHeader';
import styles from './Room.module.scss';

export const Room = () => {
	const {
		query: { id },
	} = useRouter();
	const { data } = useGetFilmByIdQuery(id);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = '/player.js';
		document.body.appendChild(script);

		return () => {
			script.remove();
		};
	}, []);

	return (
		<section className={styles.content}>
			<div className={styles.left}>
				<RoomHeader title={data?.name} />
				<div className={styles.videoContainer}>
					<div
						className={styles.video}
						id="kinobd"
						data-resize="1"
						data-bg="#000"
						data-kinopoisk={id}
					></div>
				</div>
			</div>
			<Chat />
		</section>
	);
};
