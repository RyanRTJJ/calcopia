import React, { useEffect, useState } from 'react';
import CardShadow from "./CardShadow";
import styles from "../styles/graphs.module.css";

const Support = () => {
    return (
        <CardShadow
        style={
            {height: '100%',
            margin: 20, 
            justifyContent: "flex-start"}
        }>
            <div className={styles.veneer}>
                <div style={{margin: 'auto'}}>
                    <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>Graphs</div>
                    <div style={{textAlign: 'center', fontSize: 20}}>Coming Soon</div>
                </div>
            </div>
        </CardShadow>
    )
}

export default Support;