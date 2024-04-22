import React from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}>{}</div>
        </div>
    );
};

export default Loader;