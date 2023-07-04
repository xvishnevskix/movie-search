import { useGetFilmsQuery } from '@/services/KinomoreService';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Catalog } from '@/components/Catalog/Catalog';
import { Filters } from '@/components/Filters/Filters';

export const Films = () => {
	const { filters } = useTypedSelector((state) => state.filtersReducer);
	const { page } = useTypedSelector((state) => state.paginationReducer);
	const { data, isLoading, isFetching } = useGetFilmsQuery({ page, filters });

	const { Container, Heading, Description, Body, Content } = Catalog;

	return (
		<Catalog>
			<Container>
				<Heading>Все фильмы</Heading>
				<Description>Подборка фильмов всего мира</Description>
				<Body>
					<Filters />
					<Content data={data} isLoading={isLoading} isFetching={isFetching} />
				</Body>
			</Container>
		</Catalog>
	);
};
