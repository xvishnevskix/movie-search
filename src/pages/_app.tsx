import 'normalize.css';
import '@/scss/main.scss';
import type { AppProps } from 'next/app';
import { useStore } from '@/store/store';
import { Provider } from 'react-redux';
import {createContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Head from 'next/head';
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

if (firebase.apps.length === 0) {
	firebase.initializeApp({
		apiKey: "AIzaSyCqHJpYWaTqkZiDor4Y5pXCU6MKaWdXrWM",
		authDomain: "movie-search-chat.firebaseapp.com",
		projectId: "movie-search-chat",
		storageBucket: "movie-search-chat.appspot.com",
		messagingSenderId: "301171031321",
		appId: "1:301171031321:web:ce0a92c527627335ac1988",
		measurementId: "G-FFXBQFSBS1"
	});
}




export const Context = createContext<any|null>(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

export default function MyApp({ Component, pageProps }: AppProps) {
	const store = useStore(pageProps.initialReduxState);

	const router = useRouter();

	NProgress.configure({
		showSpinner: false,
	});

	useEffect(() => {
		const handleRouteStart = () => NProgress.start();
		const handleRouteDone = () => NProgress.done();

		router.events.on('routeChangeStart', handleRouteStart);
		router.events.on('routeChangeComplete', handleRouteDone);
		router.events.on('routeChangeError', handleRouteDone);

		return () => {
			router.events.off('routeChangeStart', handleRouteStart);
			router.events.off('routeChangeComplete', handleRouteDone);
			router.events.off('routeChangeError', handleRouteDone);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Context.Provider value={{
			firebase,
			auth,
			firestore
		}}>
			<Provider store={store}>
				<Head>
					<title>Movie Search</title>
					<link rel="icon" href="/favicon.ico" />
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
					/>
					<meta name="apple-mobile-web-app-capable" content="yes" />
				</Head>
				<Component {...pageProps} />
			</Provider>
		</Context.Provider>
	);
}
