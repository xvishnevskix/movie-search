import {ChangeEvent, FC, FormEvent, useContext, useEffect, useRef, useState} from 'react';
import { TextField } from '@/UI/TextField/TextField';
import { IMessage } from '@/types/IMessage';
import { Message } from './components/Message/Message';
import { CopyToClipboard } from './components/CopyToClipboard/CopyToClipboard';
import styles from './Chat.module.scss';
import {Context} from "../../../../../pages/_app";
import {useAuthState} from "react-firebase-hooks/auth";
import { Button } from '@/components/UI/Button/Button';
import firebase from 'firebase';
import {useCollectionData} from "react-firebase-hooks/firestore";

interface ChatProps {
	data: number | undefined;
}

export const Chat:FC<ChatProps> = ({data}) => {
	const [value, setValue] = useState('');
	const ref = useRef<HTMLDivElement>(null);

	const {auth, firestore} = useContext(Context)
	const [user] = useAuthState(auth)

	const [messages] = useCollectionData<IMessage>(
		firestore.collection(`messages${data}`).orderBy('createdAt')
	)

	const login = async () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		const {user} = await auth.signInWithPopup(provider)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const sendMessage = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		firestore.collection(`messages${data}`).add({
			uid: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL,
			text: value,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			timestamp: Date.now(),
		})

		if (value.trim()) {
			setValue('');
		}
	};

	useEffect(() => {
		ref.current?.scrollTo(0, ref.current.scrollHeight);
	}, [value]);

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<CopyToClipboard />
			</div>
			{!user ? (<div className={styles.authButton}>
				<Button onClick={login}>
				<span>Пройдите авторизацию Google</span>
				</Button>
				</div>)
			:
				(<>
					<div ref={ref} className={styles.content}>
						{messages ? (
							messages.map((item) => <Message key={item.createdAt} item={item} />)
						) : (
							<span className={styles.noMessages}>Нет сообщений</span>
						)}
					</div>
					<form onSubmit={sendMessage} className={styles.form} action="#">
						<TextField
							type="text"
							variant="small"
							className={styles.input}
							placeholder="Введите сообщение"
							value={value}
							onChange={handleChange}
						/>
					</form>
				</>)}
		</div>
	);
};


