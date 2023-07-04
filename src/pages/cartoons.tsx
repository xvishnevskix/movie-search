import { GetStaticProps, NextPage } from 'next';
import { Cartoons } from '@/components/screens/Cartoons/Cartoons';
import { getCartoons } from '@/services/KinomoreService';
import { initStore } from '@/store/store';
import { Layout } from '@/components/Layout/Layout';

const CartoonsPage: NextPage = () => {
	return (
		<Layout>
			<Cartoons />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const store = initStore();
	const state = store.getState();
	const { filters } = state.filtersReducer;
	const { page } = state.paginationReducer;

	await store.dispatch(getCartoons.initiate({ page, filters }));

	return { props: { initialReduxState: store.getState() } };
};

export default CartoonsPage;
