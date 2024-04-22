import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, API_KEY } from '@/constants/api';
import { IMovies } from '@/types/IMovies';
import { IMovie } from '@/types/IMovie';
import { IBaseQuery, IQuery } from '@/types/IQuery';
import { getCurrentYear } from '@/helpers/getCurrentYear/getCurrentYear';
import { IPerson } from '@/types/IPerson';
import { IReviews } from '@/types/IReviews';
import { IImages } from '@/types/IImages';

export const movieSearchAPI = createApi({
	reducerPath: 'movieSearchAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (build) => ({
		getNewFilms: build.query<IMovies, number>({
			query: (limit) =>
				`/v1.3/movie?field=rating.kp&search=1-10&field=year&search=${getCurrentYear()}&field=typeNumber&search=1&limit=${limit}&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=${API_KEY}`,
		}),
		getNewSeries: build.query<IMovies, number>({
			query: (limit) =>
				`/v1.3/movie?field=rating.kp&search=1-10&field=year&search=${getCurrentYear()}&field=typeNumber&search=2&limit=${limit}&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&token=${API_KEY}`,
		}),
		getFilmById: build.query<IMovie, string | string[] | undefined>({
			query: (id) => `/v1.3/movie/${id}?&token=${API_KEY}`,
		}),
		getFilmByName: build.query<IMovies, IQuery>({
			query: ({ filters, page, id }) =>
				`/v1.3/movie?${filters.genre}&search=${id}&field=name&search=${filters.rating}&field=rating.kp&search=${filters.year}&field=year&sortField=year&sortType=${filters.sortByRelease}&page=${page}&isStrict=false&token=${API_KEY}`,
		}),
		getFilms: build.query<IMovies, IQuery>({
			query: ({ filters, page }) =>
				`/v1.3/movie?typeNumber=1&typeNumber=string&rating.kp=${filters.rating}&${filters.genre}&year=${filters.year}&limit=10&page=${page}&token=${API_KEY}`,
		}),
		getSeries: build.query<IMovies, IQuery>({
			query: ({ filters, page }) =>
				`/v1.3/movie?typeNumber=2&typeNumber=string&rating.kp=${filters.rating}&${filters.genre}&year=${filters.year}&limit=10&page=${page}&token=${API_KEY}`,
		}),
		getCartoons: build.query<IMovies, IQuery>({
			query: ({ filters, page }) =>
				`/v1.3/movie?typeNumber=3&typeNumber=string&rating.kp=${filters.rating}&${filters.genre}&year=${filters.year}&limit=10&page=${page}&token=${API_KEY}`,
		}),
		getPersonById: build.query<IPerson, string | string[] | undefined>({
			query: (id) => `/v1.1/person/${id}?&token=${API_KEY}`,
		}),
		getFavourites: build.query<IMovies, IQuery>({
			query: ({ query, filters, page }) =>
				`/v1.3/movie?rating.kp=${filters.rating}&${filters.genre}&year=${filters.year}&${query}&limit=10&page=${page}&token=${API_KEY}`,
		}),
		getFilmsBySearch: build.query<IMovies, IBaseQuery>({
			query: ({ query, type, limit }) =>
				`/v1.3/movie?search=${query}&field=name&limit=${limit}&sortField=year&sortType=-1&field=typeNumber&search=${type}&isStrict=true&token=${API_KEY}`,
		}),
		getReviewsById: build.query<IReviews, IBaseQuery>({
			query: ({ id, limit }) =>
				`/v1/review?search=${id}&field=movieId&limit=${limit}&token=${API_KEY}`,
		}),
		getMovieImages: build.query<IImages, IBaseQuery>({
			query: ({id, limit}) => `/v1/image?movieId=${id}&limit=${limit}&token=${API_KEY}`
		})
	}),
});

export const {
	useGetNewFilmsQuery,
	useGetNewSeriesQuery,
	useGetFilmByIdQuery,
	useGetFilmByNameQuery,
	useGetFilmsQuery,
	useGetSeriesQuery,
	useGetCartoonsQuery,
	useGetPersonByIdQuery,
	useGetFavouritesQuery,
	useGetFilmsBySearchQuery,
	useGetReviewsByIdQuery,
	useGetMovieImagesQuery
} = movieSearchAPI;

export const {
	getNewFilms,
	getNewSeries,
	getFilmById,
	getFilmByName,
	getFilms,
	getSeries,
	getCartoons,
	getPersonById,
} = movieSearchAPI.endpoints;
