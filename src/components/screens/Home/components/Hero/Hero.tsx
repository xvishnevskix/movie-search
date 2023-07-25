import { FiArrowRight } from 'react-icons/fi';
import { Button } from '@/UI/Button/Button';
import { Title } from '@/UI/Title/Title';
import { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './Hero.module.scss';
import 'swiper/css';
import 'swiper/css/effect-fade';
import bg1 from "/bg1.jpg"

export const Hero = () => {
	const { push } = useRouter();

	return (
		<section className={styles.section} style={{ backgroundImage: 'url(/9112667.jpg)' }}>
			<h1 className="visually-hidden">CinemaSearch — бесплатные фильмы и сериалы</h1>
			<div className={classNames('container', styles.container)}>
				<div className={styles.content}>
					<Title variant="h2" className={styles.title}>
						Стражи Галактики. Часть 3
					</Title>
					<p className={styles.desc}>
						Питер Квилл никак не может смириться с потерей Гаморы и теперь вместе со Стражами Галактики
						вынужден отправиться на очередную миссию по защите Вселенной.
					</p>
					<Button onClick={() => push(`/film/1044280`)} endIcon={<FiArrowRight />}>
						Подробнее
					</Button>

				</div>


			</div>
			<div className={styles.overlay}></div>
		</section>
	);
};
