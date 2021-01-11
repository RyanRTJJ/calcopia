import React from 'react';
import styles from "../styles/searchboxitem.module.css";

const SearchBoxItem = (props) => {
    return (
        <div className={styles.layoutContainer} onClick={() => props.onClick(props.foodItem)}>
            <div className={styles.emojiAndName}>
                <div className={styles.emojiContainer}>
                    {props.foodItem.emoji}
                </div>
                <div className={styles.nameContainer}>
                    {props.foodItem.name.charAt(0).toUpperCase()}{props.foodItem.name.slice(1)}
                </div>
                <small style={{
                    fontWeight: "normal", 
                    marginLeft: 10, 
                    marginRight: 10
                    }}>
                        (one{props.foodItem.unit ? " " : ''}{props.foodItem.unit})
                </small>
            </div>
            <div className={styles.information}>
                <div className={styles.macroStat}>🥜 {props.foodItem.protein_per_unit}g</div>
                <div className={styles.macroStat}>🍚 {props.foodItem.carb_per_unit}g</div>
                <div className={styles.macroStat}>💧 {props.foodItem.fat_per_unit}g</div>
                <div className={styles.macroStat}>⚡️ {props.foodItem.cal_per_unit}</div>
            </div>
        </div>
    )
}

export default SearchBoxItem;