import { useGetFavouritesQuery } from '@/services/MovieSearchService';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Catalog } from '@/components/Catalog/Catalog';
import { Filters } from '@/components/Filters/Filters';
import { useFavourites } from '@/hooks/useFavourite';

export const Favourites = () => {
	const { favourites } = useFavourites();
	const query = favourites.map((el) => `&id=${el}&`);
	const { filters } = useTypedSelector((state) => state.filtersReducer);
	const { page } = useTypedSelector((state) => state.paginationReducer);
	// @ts-ignore
	const { data, isLoading, isFetching } = useGetFavouritesQuery({ page, filters, query });

	const { Container, Heading, Description, Body, Content, Subtitle } = Catalog;
	console.log(query)
	return (
		<Catalog>
			<Container>
				<Heading>Избранное</Heading>
				<Description>Список избранного кино</Description>
				<Body>
					<Filters />
					{query.length===0 ? (
						<Subtitle>Ваш писок избранного пуст</Subtitle>
					) : (
						<Content data={data} isLoading={isLoading} isFetching={isFetching} />

					)}
				</Body>
			</Container>
		</Catalog>
	);
};
