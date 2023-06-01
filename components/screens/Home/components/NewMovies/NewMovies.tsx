import { FC } from 'react'
import { FilmItem } from '../../../../FilmItem/FilmItem'
import { useGetNewFilmsQuery } from '../../../../../services/KinopoiskService'
import Link from 'next/link'

export const NewMovies: FC = () => {

  const {data} = useGetNewFilmsQuery('')

  return (
    <section>
      <div className='container g-section__container'>
        <div className='g-section__top'>
          <h2 className='g-title g-section__title'>Фильмы этого года</h2>
          <Link href='/films'>
            <a href="#" className='g-btn'>Смотреть все</a>
          </Link>
        </div>
        <ul className='list-reset g-section__grid'>
          {data?.docs?.map(el => (
              <FilmItem key={el.id} item={el} />
          ))}
        </ul>
      </div>
    </section>
  )
}
