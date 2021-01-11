import React from "react";
import styles from "../styles/cardshadow.module.css";

const CardShadow = (props) => {
    return (
        <div className={`
            ${styles.cardContainer}
            `}
            style={{...props.style}}
            >
            {props.children}
        </div>
    )
}

export default CardShadow;