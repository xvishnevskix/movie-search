import { FC } from 'react';
import { IMovie } from '@/types/IMovie';
import { convertMovieType } from '@/helpers/convertMovieType/convertMovieType';
import { MovieRating } from '@/UI/MovieRating/MovieRating';
import Ratio from 'react-ratio';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FilmItem.module.scss';

interface FilmItemProps {
	item: IMovie;
}

export const FilmItem: FC<FilmItemProps> = ({ item }) => {
	const { id, description, year, name, enName, type, rating } = { ...item };

	return (
		<li className={styles.item}>
			<div className={styles.top}>
				<Link href={`/film/${id}`}>
					<Ratio ratio={2 / 3}>
						<a className={styles.imageContainer}>
							<Image
								unoptimized
								className={styles.image}
								layout="fill"
								src={`https://st.kp.yandex.net/images/film_iphone/iphone360_${id}.jpg`}
								alt={description}
							/>
						</a>
					</Ratio>
				</Link>
				{rating && <MovieRating rating={rating} />}
			</div>
			<Link href={`/film/${id}`}>
				<a className={styles.title}>{name ? name : enName}</a>
			</Link>
			{type?.length && (
				<span className={styles.info}>
					{year && `${year}, `} {convertMovieType(type)}
				</span>
			)}
		</li>
	);
};
