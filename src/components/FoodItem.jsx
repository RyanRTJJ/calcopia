import React from 'react';
import styles from "../styles/fooditem.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const FoodItem = (props) => {
    const renderNutritionContainer = (nutritionEmoji, nutritionString, quantity) => {
        return (
            <div className={styles.nutritionContainer}>
                {nutritionEmoji} {quantity}g {nutritionString}
            </div>
        )
    }

    const renderNutritionContainerCompact = (nutritionEmoji, nutritionString, quantity) => {
        return (
            <div className={styles.nutritionContainerCompact}>
                <div style={{fontSize: 11, fontWeight: 'bold'}}>{nutritionEmoji} {quantity}g</div>
                <div style={{fontSize: 10}}>{nutritionString}</div>
            </div>
        )
    }

    // Unused function
    // eslint-disable-next-line no-unused-vars
    const renderCrossButton = () => {
        return (
            <div 
                className={styles.deleteButton}
                onClick={() => props.onDecrement(props.foodItem)}
            >
                <FontAwesomeIcon icon={faTimes}/>
            </div>
        )
    }

    const renderArrows = () => {
        return (
            <div className={styles.arrowsContainer}>
                <div className={styles.arrowContainer} onClick={() => props.onIncrement(props.foodItem)}>
                    <FontAwesomeIcon icon={faAngleUp}/>
                </div>
                <div className={styles.arrowContainer} onClick={() => props.onDecrement(props.foodItem)}>
                    <FontAwesomeIcon icon={faAngleDown}/>
                </div>
            </div>
                
        )
    }
    return (
        <div 
            className={`${props.viewingMode === 'expanded' ? styles.layoutContainer : styles.layoutContainerCompact} ${props.isHighlighted ? styles.highlighted : ""}`} 
            onClick={() => {
                props.onHighlightFood(props.foodItem);
            }}
        >
            <div className={styles.emojiContainer}>
                {props.foodItem.emoji}
            </div>
            <div className={styles.nameQuantContainer}>
                <div className={props.viewingMode === "expanded" ? styles.nameContainer : styles.nameContainerCompact}>
                    {props.foodItem.quantity} {props.foodItem.name.charAt(0).toUpperCase()}{props.foodItem.name.slice(1)}{(props.foodItem.quantity > 1) ? 's' : ''}
                </div>
                <small style={{fontSize: 12}}>
                    {props.foodItem.unit}
                </small>
            </div>
            <div className={props.viewingMode === 'expanded' ? styles.parentNutritionContainer : styles.parentNutritionContainerCompact}>
                {props.viewingMode === 'expanded' ? 
                    renderNutritionContainer("🥜", "protein", props.foodItem.protein_per_unit * props.foodItem.quantity) : 
                    renderNutritionContainerCompact("🥜", "protein", props.foodItem.protein_per_unit * props.foodItem.quantity)}
                {props.viewingMode === 'expanded' ? 
                    renderNutritionContainer("🍚", "carbs", props.foodItem.carb_per_unit * props.foodItem.quantity) : 
                    renderNutritionContainerCompact("🍚", "carbs", props.foodItem.carb_per_unit * props.foodItem.quantity)}
                {props.viewingMode === 'expanded' ? 
                    renderNutritionContainer("⚡️", "calories", props.foodItem.cal_per_unit * props.foodItem.quantity) : 
                    renderNutritionContainerCompact("⚡️", "calories", props.foodItem.cal_per_unit * props.foodItem.quantity)}
            </div>
            {
                renderArrows()
            }
        </div>
    )
}

export default FoodItem;