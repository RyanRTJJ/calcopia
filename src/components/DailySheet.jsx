import React, { useEffect, useState, useContext } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import CardShadow from "./CardShadow";
import FoodItem from "./FoodItem";
import SearchBox from "./SearchBox";
import axios from 'axios';
import styles from "../styles/dailysheet.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl, faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { DatePicker } from 'react-rainbow-components';
import { useHistory } from 'react-router-dom';
import UserContext from "../context/UserContext";
import API_URL from "../constants";

const DailySheet = (props) => {
    const [foodDictionary, setfoodDictionary] = useState([]);
    const [consumedFood, setConsumedFood] = useStateWithCallbackLazy([]);
    const [totals, setTotals] = useState();
    const [viewingMode, setViewingMode] = useState('expanded');
    const { userData, setUserData } = useContext(UserContext);
    const [sheetDate, setSheetDate] = useState({
        date: new Date(),
    });
    
    var history = useHistory();

    const containerStyles = {
        maxWidth: 400,
    };
    
    useEffect(()  => {
        // Step 1) Initialize food dictionary.
        axios.get(API_URL + '/foodinfo')
            .then(res => {
                setfoodDictionary(res.data.map(food => food));

                // Step 2) Grab sheet data.
                axios.get(API_URL + '/users/', { headers: { "x-auth-token": userData.token }})
                    .then(res => {
                        const todaysDailySheet = res.data.daily_sheets.filter(sheet => sheet.date === sheetDate.date.toDateString().substring(0,15));
                        console.log(todaysDailySheet);
                        if (todaysDailySheet.length > 0) {
                            var loadConsumedFood = [...todaysDailySheet[0].food_entries]; // Manually selected the firs dailySheet in case for some reason more than 1.
                            
                            //Attempt 4
                            const promises = loadConsumedFood.map(someFood => {
                                return axios.post(API_URL + '/foodinfo/getOneConsumedFood', 
                                { id: someFood.mongoID, quantity: someFood.quantity },
                                { headers: { "x-auth-token": userData.token }})
                                    .then(res => res.data)
                            })
                            Promise.all(promises).then(data => {
                                console.log(data);
                                console.log("Setting in step 2");
                                setConsumedFood(data);
                            })
                        }
                        else {
                            setConsumedFood([]);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
        
        console.log(viewingMode);
    }, [viewingMode, sheetDate, userData.token]);

    // Second useEffect
    useEffect(() => {
        const newTotals = getTotals();
        setTotals(newTotals);
        props.handleChangeTotals(newTotals);
    }, [consumedFood]) // eslint-disable-line react-hooks/exhaustive-deps

    const getTotals = () => {
        var total_protein = 0;
        var total_carb = 0;
        var total_fat = 0;
        var total_cal = 0;

        consumedFood.forEach((food, index) => {
            total_carb = total_carb += food.carb_per_unit * food.quantity;
            total_protein = total_protein += food.protein_per_unit * food.quantity;
            total_fat = total_fat += food.fat_per_unit * food.quantity;
            total_cal = total_cal += food.cal_per_unit * food.quantity;
        })

        console.log({
            total_carb: total_carb,
            total_protein: total_protein,
            total_fat: total_fat,
            total_cal: total_cal
        });
        return {
            total_carb: total_carb,
            total_protein: total_protein,
            total_fat: total_fat,
            total_cal: total_cal
        };
    }

    const addItem = (foodItem) => {
        // If already in list, increment quantity:
        const tempIndex = consumedFood.findIndex(food => food._id === foodItem._id);
        if (tempIndex > -1) {
            var newConsumedFood = [...consumedFood];
            newConsumedFood[tempIndex].quantity += 1;
            setConsumedFood(newConsumedFood, () => {
                console.log("then save");
                handleSave(newConsumedFood)});
        }
        else {
            // If not already in list, just add.
            const foodWithQuant = {...foodItem, quantity: 1};
            setConsumedFood([...consumedFood, foodWithQuant], (consumedFood) => {
                console.log("then save");
                console.log(consumedFood);
                handleSave([...consumedFood, foodWithQuant])});
        }
        // Need to update backend once user accounts have been created.
        
    }

    const decrementItem = (foodItem) => {
        // If quantity is more than 1, decrement quantity:
        const tempIndex = consumedFood.findIndex(food => food._id === foodItem._id);
        var newConsumedFood = [...consumedFood];
        if (consumedFood[tempIndex].quantity > 1) {
            newConsumedFood[tempIndex].quantity -= 1;
            setConsumedFood(newConsumedFood, () => {
                console.log("then save");
                handleSave(newConsumedFood);
            });
        }
        else {
            // Count === 1, delete from list.
            newConsumedFood.splice(tempIndex, 1);
            setConsumedFood(newConsumedFood, () => { 
                handleSave(newConsumedFood) 
            });
        }
        // Save to backend
        // Done in useefect
    }

    const toggleViewingMode = () => {
        if (viewingMode === 'expanded') {
            setViewingMode('compact');
        }
        else {
            setViewingMode('expanded');
        }
    }
    
    const handleSave = (localConsumedFood) => {
        console.log("saving...");
        console.log(localConsumedFood);

        var foodEntries = [...localConsumedFood];
        foodEntries.forEach((foodEntry, index) => {
            foodEntries[index] = { mongoID: foodEntry._id, quantity: foodEntry.quantity };
        })

        var dailySheet = { date: sheetDate.date.toDateString().substring(0,15), food_entries: foodEntries };
        var dailySheets = userData.daily_sheets ? 
            [...userData.daily_sheets.filter(sheet => (sheet.date !== dailySheet.date)), dailySheet] : 
            [dailySheet];

        const newDetails = {
            id: userData.user.id,
            email: userData.user.email,
            daily_sheets: dailySheets
        }

        let token = localStorage.getItem("auth-token");
        if (token === null || token === "" || token === undefined) {
          localStorage.setItem("auth-token", "");
          token = "";
          history.push("/");
          return;
        }

        axios.post(API_URL + "/users/updateSheets",
            newDetails, 
            { headers: { "x-auth-token": token }}
            )
            .then(res => {
                console.log("Logging response");
                console.log(res.data);
            })
            .catch(res => {
                console.log(res.data);
                console.log("update failed");
            })
    }

    return (
        <CardShadow
        style={
            {height: '100%',
            margin: 20, 
            paddingTop: 15, 
            paddingBottom: 0, 
            justifyContent: "flex-start"}
        }>
            <h2 style={{display: 'flex', alignItems: 'center', marginLeft: 20, marginRight: 20}}>
                Nutrition Sheet for 
                
                <div>
                    <div
                        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
                        style={containerStyles}
                    >
                        <DatePicker
                            className={styles.datePicker}
                            value={sheetDate.date}
                            onChange={value => setSheetDate({ date: value })}
                            formatStyle="large"
                        />
                    </div>
                </div>


                <div 
                    className={viewingMode === 'expanded' ? styles.viewingModeButtonDepressed : styles.viewingModeButton} 
                    style={{display: 'inline-flex', fontSize: 13, marginLeft: 10}}
                    onClick={() => {toggleViewingMode()}}
                >
                    <FontAwesomeIcon icon={faListUl} />
                </div>
                <div 
                    className={viewingMode === 'expanded' ? styles.viewingModeButton : styles.viewingModeButtonDepressed} 
                    style={{display: 'inline-flex', fontSize: 13, marginLeft: 10}}
                    onClick={() => {toggleViewingMode()}}
                >
                    <FontAwesomeIcon icon={faGripVertical} />
                </div>
            </h2>
            <div className={viewingMode === 'expanded' ? styles.foodItemContainer : styles.foodItemContainerCompact}>
            {consumedFood.map(foodItem => {
                    return (
                        <FoodItem
                            key={foodItem.name}
                            foodItem={foodItem}
                            onIncrement={addItem}
                            onDecrement={decrementItem}
                            onHighlightFood={props.onHighlightFood}
                            isHighlighted={props.highlightedFood === foodItem}
                            viewingMode={viewingMode}
                        />
                    );
                })}
            </div>
            <div className={styles.searchBoxContainer}>
                <h2 className={styles.textMargin}>Search for foods to add:</h2>
                <SearchBox foodDictionary={foodDictionary} onClick={addItem}></SearchBox>
            </div>

            <div className={styles.searchBoxContainer} styles={{paddingBottom: 0}}>
                <h2 className={styles.textMargin}>Create new food entry in dictionary:</h2>
                <div className={styles.veneer}>
                    Coming soon
                </div>
            </div>
        </CardShadow>
    )
}

export default DailySheet;