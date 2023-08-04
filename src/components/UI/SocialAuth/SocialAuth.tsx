import React, {useContext, useState} from 'react';
import styles from "@/components/screens/SignIn/SignIn.module.scss";
import firebase from "firebase";
import {Context} from "../../../pages/_app";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {RoutesEnum} from "@/constants/routes";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {IMessage} from "@/types/IMessage";
import Loader from "@/UI/Loader/Loader";




export const SocialAuth = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [checkUser] = useState(user)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account'
        })
        const {user} = await auth.signInWithRedirect(provider)
    }
    const router = useRouter()


    if (user !== checkUser) {
        router.push(RoutesEnum.Home)
    }

    return (
        <div  className={styles.auth_buttons}>
            <button onClick={login}  className={styles.google}>
            </button>
        </div>
    );
};

export default SocialAuth;