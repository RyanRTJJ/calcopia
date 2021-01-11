import React, { useEffect, useState } from 'react';
import styles from "../styles/searchbox.module.css";
import SearchBoxItem from "./SearchBoxItem";

const SearchBox = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [matchedFoodItems, setMatchedFoodItems] = useState([])
    
    useEffect(() => {
        // sync searchQuery with matchedFoodItems
        if (searchQuery !== "") {
            var filtered = [...props.foodDictionary.filter(foodItem => foodItem.name.includes(searchQuery))];
            setMatchedFoodItems(filtered);
        }
        else {
            setMatchedFoodItems([]);
        }
    }, [props.foodDictionary, searchQuery]);

    const updateSearchQuery = (event) => {
        //Parse dictionary
        setSearchQuery(event.target.value.toLowerCase());
        //The rest is handled in useEffect because of render cycles.
    }
    // props will contain a list of items currently being filtered through.
    return (
        <div className={styles.layoutContainer}>
            <div className={styles.searchBarContainer}>
                <input 
                    type="text" 
                    id="searchBar"
                    name="searchBar" 
                    className={styles.searchBar}
                    onChange={updateSearchQuery}
                    autoComplete="off"
                    />
                <div className={styles.suggestions} style={{visibility: matchedFoodItems.length > 0 ? "visible" : "hidden"}}>
                    {matchedFoodItems.map(foodItem => {
                        return (
                            <SearchBoxItem 
                                key={foodItem.name} 
                                foodItem={foodItem} 
                                onClick={() => {
                                    props.onClick(foodItem); 
                                    setSearchQuery(""); 
                                    document.getElementById("searchBar").value = '';
                                }}>
                            </SearchBoxItem>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchBox;