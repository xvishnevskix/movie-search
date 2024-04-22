import { FC } from 'react';
import { convertTimestampToDate } from '@/helpers/convertTimestampToDate/convertTimestampToDate';
import { IMessage } from '@/types/IMessage';
import styles from './Message.module.scss';
import { Avatar } from '@material-ui/core';

interface MessageProps {
	item: IMessage;
}

export const Message: FC<MessageProps> = ({ item }) => {
	const { text, timestamp, displayName, photoURL} = item;

	return (
		<div className={styles.message}>
			<div className={styles.top}>
				<Avatar src={photoURL}/>
				<span className={styles.name}>{displayName}</span>
			</div>
			<div className={styles.bottom}>
				<p className={styles.text}>{text}</p>
				<span className={styles.time}>{convertTimestampToDate(timestamp, 'HH:mm')}</span>
			</div>
		</div>
	);
};
