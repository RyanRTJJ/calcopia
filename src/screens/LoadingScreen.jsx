import React from 'react';
import styles from '../styles/loadingscreen.module.css';

const LoadingScreen = () => {
    return (
        <div className={styles.imageBackground}>
            <div className={styles.veneer}>
                <div className={styles.textContainer}>
                    <div className={styles.welcomeText}>
                        Welcome
                    </div>
                    <div className={styles.subtitles}>Loading...</div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen;