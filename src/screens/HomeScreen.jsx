import React, { useEffect, useState, useContext } from "react";
import DailySheet from "../components/DailySheet";
import Graphs from "../components/Graphs";
import Support from "../components/Support";
import NutritionCard from "../components/NutritionCard";
import TotalsCard from "../components/TotalsCard";
import styles from "../styles/homescreen.module.css";
import UserContext from "../context/UserContext";
import ControlPanel from "../components/ControlPanel";

const HomeScreen = () => {
    const [focusedFood, setFocusedFood] = useState(null);
    const {userData, setUserData} = useContext(UserContext); // Curly braces are object destructuring
    const [totals, setTotals] = useState({
        total_carb: 0,
        total_protein: 0,
        total_fat: 0,
        total_cal: 0
    });

    const [activeMenuIndex, setActiveMenuIndex] = useState(0);

    const displayDailySheet = () => {
        setActiveMenuIndex(0);
    }
    const displayGraphs = () => {
        setActiveMenuIndex(1);
    }
    const displaySupport = () => {
        setActiveMenuIndex(2);
    }
    const handleHighlightFood = (someFoodInfo) => {
        setFocusedFood(someFoodInfo);
        console.log(someFoodInfo);
    }
    const handleChangeTotals = (totalsInformation) => {
        setTotals(totalsInformation);
        console.log(totalsInformation);
    }

    useEffect(() => {
        console.log(userData);
    })

    return (
        <div className={styles.imageBackground}>
            <div className={styles.space}></div>
            <div className={styles.sideCol}>
                <ControlPanel 
                    displayDailySheet={displayDailySheet}
                    displayGraphs={displayGraphs}
                    displaySupport={displaySupport}
                />
            </div>
            <div className={styles.middleCol}>
                { activeMenuIndex === 0 ?
                    <DailySheet onHighlightFood={handleHighlightFood} highlightedFood={focusedFood} handleChangeTotals={handleChangeTotals}></DailySheet> :
                    activeMenuIndex === 1 ? 
                    <Graphs/> : <Support/>}
            </div>
            <div className={styles.sideCol}>
                <NutritionCard focusedFood={focusedFood}></NutritionCard>
                <TotalsCard totalsInformation={totals}></TotalsCard>
            </div>
            <div className={styles.space}></div>
        </div>
    )
}

export default HomeScreen;