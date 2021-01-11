import React from 'react';
import CardShadow from "./CardShadow";
import styles from "../styles/totalscard.module.css";

const TotalsCard = (props) => {
    if (props.totalsInformation) {
        var biggestContribution = props.totalsInformation.total_protein * 4;

        if (biggestContribution < props.totalsInformation.total_carb * 4) {
            biggestContribution = props.totalsInformation.total_carb * 4;
        }
        if (biggestContribution < props.totalsInformation.total_fat * 9) {
            biggestContribution = props.totalsInformation.total_fat * 9;
        }
        if (biggestContribution === 0) {
            biggestContribution = 1;
        }
        var protein_normalized = (props.totalsInformation.total_protein * 4 * 100) / biggestContribution;
        var carb_normalized = (props.totalsInformation.total_carb * 4 * 100) / biggestContribution;
        var fat_normalized = (props.totalsInformation.total_fat * 9 * 100) / biggestContribution;

        
        return (
            <CardShadow
            style={
                {height: "100%", 
                width: "100%", 
                margin: 20, 
                marginTop: 0,
                paddingTop: 15, 
                paddingBottom: 15, 
                justifyContent: "flex-start",
                }
            }>
                <h2 style={{marginLeft: 20, marginRight: 20}}>Daily Overall Proportions</h2>
                <div className={styles.macroBar}>
                    <div className={styles.labelRow} 
                        style={{
                            background: `linear-gradient(90deg, orange ${protein_normalized}%, rgba(0,0,0,0.6) 0%`,
                        }}>
                        <div>🥜 protein: </div>
                        <div>{props.totalsInformation.total_protein}g</div>
                    </div>
                    <div className={styles.labelRow} 
                        style={{
                            background: `linear-gradient(90deg, orange ${carb_normalized}%, rgba(0,0,0,0.6) 0%`,
                        }}>
                        <div>🍚 carbs: </div>
                        <div>{props.totalsInformation.total_carb}g</div>
                    </div>
                    <div className={styles.labelRow} 
                        style={{
                            background: `linear-gradient(90deg, orange ${fat_normalized}%, rgba(0,0,0,0.6) 0%`,
                        }}>
                        <div>💧 fat: </div>
                        <div>{props.totalsInformation.total_fat}g</div>
                    </div>
                    <div className={styles.labelRow}>
                        <div>⚡️ calories: </div>
                        <div>{props.totalsInformation.total_cal}</div>
                    </div>
                </div>
            </CardShadow>
        )
    }
    else {
        return (
            <div>It's late.</div>
        )
    }
}

export default TotalsCard