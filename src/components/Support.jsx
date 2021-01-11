import React, { useEffect, useState } from 'react';
import CardShadow from "./CardShadow";
import styles from "../styles/support.module.css";

const Support = () => {
    return (
        <CardShadow
        style={
            {height: '100%',
            margin: 20, 
            paddingTop: 15, 
            paddingBottom: 15, 
            justifyContent: "flex-start"}
        }>
            <h2 className={styles.textMargin}>Hi there.</h2>
            <p 
                style={{fontSize: 13}} 
                className={styles.textMargin}
            >
                As you know, I spent probably way too much time coding this project when I really should have been using this time to learn things that would help me be a better human at living life. So although this was a hobby project, I hope it makes you a better human. At living life. 
            </p>
            <h2 className={styles.textMargin}>Gimme money. 💸💸💸</h2>
            <p 
                style={{fontSize: 13}} 
                className={styles.textMargin}
            >
                Oh btw, this costs money to run. You know, server stuff, domain stuff, idk. So if you like this enough pls support me by making me less likely to be homeless. Jk unless. Click the link below!!!!
            </p>
        </CardShadow>
    )
}

export default Support;