import React from 'react';
import CardShadow from "./CardShadow";
import styles from "../styles/nutritioncard.module.css";

const NutritionCard = (props) => {
    if (props.focusedFood) {
        var biggestContribution = props.focusedFood.protein_per_unit * 4;

        if (biggestContribution < props.focusedFood.carb_per_unit * 4) {
            biggestContribution = props.focusedFood.carb_per_unit * 4;
        }
        if (biggestContribution < props.focusedFood.fat_per_unit * 9) {
            biggestContribution = props.focusedFood.fat_per_unit * 9;
        }
        var protein_normalized = props.focusedFood.protein_per_unit ? (props.focusedFood.protein_per_unit * 4 * 100) / biggestContribution : 0;
        var carb_normalized = props.focusedFood.carb_per_unit ? (props.focusedFood.carb_per_unit * 4 * 100) / biggestContribution : 0;
        var fat_normalized = props.focusedFood.fat_per_unit ? (props.focusedFood.fat_per_unit * 9 * 100) / biggestContribution : 0;

        return (
            <CardShadow
            style={
                {height: 600, 
                width: "100%", 
                margin: 20, 
                paddingTop: 15, 
                paddingBottom: 15, 
                justifyContent: "flex-start",
                }
            }>
                <h2 style={{marginLeft: 20, marginRight: 20}}>Nutrition Profile</h2>
                <div className={styles.headerBar}>
                    <h3>{props.focusedFood.emoji} {props.focusedFood.name.charAt(0).toUpperCase()}{props.focusedFood.name.slice(1)}</h3>
                </div>
                <h2 style={{marginLeft: 20, marginRight: 20, marginBottom: 0,}}>Macro Proportions</h2>
                <p style={{marginLeft: 20, marginRight: 20, marginTop: 0}}>
                    Per serving size (serving size: 1 {props.focusedFood.unit})
                </p>
                <div className={styles.macroBar}>
                    <div className={styles.labelRow} 
                        style={{
                            background: `linear-gradient(90deg, orange ${protein_normalized}%, rgba(0,0,0,0.6) 0%`,
                        }}>
                        <div>🥜 protein: </div>
                        <div>{props.focusedFood.protein_per_unit}g</div>
                    </div>
                    <div className={styles.labelRow} 
                        style={{
                            background: `linear-gradient(90deg, orange ${carb_normalized}%, rgba(0,0,0,0.6) 0%`,
                        }}>
                        <div>🍚 carbs: </div>
                        <div>{props.focusedFood.carb_per_unit}g</div>
                    </div>
                    <div className={styles.labelRow} 
                        style={{
                            background: `linear-gradient(90deg, orange ${fat_normalized}%, rgba(0,0,0,0.6) 0%`,
                        }}>
                        <div>💧 fat: </div>
                        <div>{props.focusedFood.fat_per_unit}g</div>
                    </div>
                    <div className={styles.labelRow}>
                        <div>⚡️ calories: </div>
                        <div>{props.focusedFood.cal_per_unit}</div>
                    </div>
                </div>
                <h2 style={{marginLeft: 20, marginRight: 20}}>Other Goodies</h2>
            </CardShadow>
        )
    }
    else {
        return (
            <CardShadow
            style={
                {height: "50%", 
                width: "100%", 
                margin: 20, 
                paddingTop: 15, 
                paddingBottom: 15, 
                }
            }>
                <h2 style={{marginLeft: 20, marginRight: 20}}>Nutrition Profile</h2>
                
                <div 
                    style={{
                        display: "flex", 
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                        }}>
                    Click on a food item to learn more about it!
                </div>
            </CardShadow>
        )
    }
}

export default NutritionCard;