import { RoutesEnum } from '@/constants/routes';
import { Auth } from '@/components/Auth/Auth';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import * as Yup from 'yup';
import styles from './SignIn.module.scss'
import Image from "next/image";
import SocialAuth from "@/UI/SocialAuth/SocialAuth";
import Loader from "@/UI/Loader/Loader";
import React, {useContext} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {IMessage} from "@/types/IMessage";
import {Context} from "../../../pages/_app";
import {useAuthState} from "react-firebase-hooks/auth";


export const SignIn = () => {
	const { push, pathname } = useRouter();
	const { Heading, TextField, Button, Link } = Auth;

	const {auth} = useContext(Context)
	const [user] = useAuthState(auth)

	const schema = Yup.object().shape({
		email: Yup.string().required('Введите email'),
		password: Yup.string().required('Введите пароль'),
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	const handleLogin = handleSubmit((data) => {
		console.log('Успешная авторизация', data);
		push(RoutesEnum.Home);
		reset();
	});


	return (
		<Auth onSubmit={handleLogin}>
			<Heading>Вход</Heading>
			<Controller
				name="email"
				control={control}
				render={({ field: { value, onChange } }) => {
					return (
						<TextField
							type="email"
							label="Email"
							placeholder="Введите email"
							value={value}
							onChange={onChange}
							errorMessage={errors.email?.message}
							error={errors.hasOwnProperty('email')}
						/>
					);
				}}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field: { value, onChange } }) => {
					return (
						<TextField
							type="password"
							label="Пароль"
							placeholder="Введите пароль"
							value={value}
							onChange={onChange}
							errorMessage={errors.password?.message}
							error={errors.hasOwnProperty('password')}
						/>
					);
				}}
			/>
			<Button onClick={handleLogin}>Войти</Button>
			<Link>
				Нет аккаунта?&nbsp;
				<NextLink href={RoutesEnum.Register}>
					<a>Зарегистрироваться</a>
				</NextLink>
			</Link>
			<SocialAuth/>
		</Auth>
	);
};
