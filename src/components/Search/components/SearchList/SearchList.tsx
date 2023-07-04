import { FC, useEffect, useState } from 'react';
import { ButtonBase } from '@/UI/ButtonBase/ButtonBase';
import { SearchItem } from '../SearchItem/SearchItem';
import { useGetFilmsBySearchQuery } from '@/services/KinomoreService';
import { Spinner, SpinnerSizes } from '@/UI/Spinner/Spinner';
import { Button } from '@/UI/Button/Button';
import classNames from 'classnames';
import styles from './SearchList.module.scss';

interface SearchListProps {
	value: string;
}

export const SearchList: FC<SearchListProps> = ({ value }) => {
	const [type, setType] = useState<string>('1');
	const { data, isFetching, isLoading, refetch } = useGetFilmsBySearchQuery(
		{ query: value, type, limit: 100 },
		{ skip: value.length === 1 }
	);
	const { docs } = { ...data };

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const handleChangeType = (type: string) => setType(type);

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<div className={styles.btns}>
					<Button
						type="button"
						variant="sm"
						onClick={() => handleChangeType('1')}
						className={classNames(styles.btn, type === '1' && styles.active)}
					>
						Фильмы
					</Button>
					<Button
						type="button"
						variant="sm"
						onClick={() => handleChangeType('2')}
						className={classNames(styles.btn, type === '2' && styles.active)}
					>
						Сериалы
					</Button>
					<Button
						type="button"
						variant="sm"
						onClick={() => handleChangeType('3')}
						className={classNames(styles.btn, type === '3' && styles.active)}
					>
						Мультики
					</Button>
				</div>
			</div>
			<>
				{docs?.length ? (
					<>
						{!isFetching && !isLoading ? (
							<>
								<ul className={classNames('list-reset', styles.list)}>
									{docs.map((item) => (
										<SearchItem key={item.id} item={item} />
									))}
								</ul>
							</>
						) : (
							<div className={styles.loader}>
								<Spinner variant="dark" size={SpinnerSizes.medium} />
							</div>
						)}
					</>
				) : (
					<p className={styles.desc}>По вашему запросу ничего не найдено</p>
				)}
			</>
			<ButtonBase ripple className={styles.more}>
				Показать все
			</ButtonBase>
		</div>
	);
};
