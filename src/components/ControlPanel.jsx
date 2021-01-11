import React, { useContext, useState } from 'react';
import CardShadow from "./CardShadow";
import styles from "../styles/controlpanel.module.css";
import UserContext from "../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUserLock } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";

const ControlPanel = (props) => {
    const {userData, setUserData} = useContext(UserContext);
    const [activeMenuIndex, setActiveMenuIndex] = useState(0);
    const history = useHistory();

    const displayDailySheet = () => {
        setActiveMenuIndex(0);
    }
    const displayGraphs = () => {
        setActiveMenuIndex(1);
    }
    const displaySupport = () => {
        setActiveMenuIndex(2);
    }
    
    const handleLogout = () => {
        console.log("logging out...");
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.removeItem("auth-token")
        history.push("/");
    }
    
    return (
        <CardShadow
        style={
            {height: "100%", 
            width: "100%", 
            margin: 20, 
            paddingTop: 15, 
            paddingBottom: 15, 
            justifyContent: "flex-start",
            }
        }>
            <h2 className={styles.textMargin}>Welcome Back</h2>

            <div className={styles.informationBar}>
                <div className={styles.avatar}/>
                <b style={{marginBottom: 5}}>Account information</b>
                <div style={{fontSize: 14}}>
                    <FontAwesomeIcon style={{marginRight: 10, marginLeft: 10}} icon={faEnvelope}/>{userData.user.email}
                </div>
                <div className={styles.passwordButton}>Change Password</div>
            </div>

            <h2 className={styles.textMargin}>Menu</h2>
            <div className={styles.macroBar}>
                <div onClick={() => {displayDailySheet(); props.displayDailySheet();}} 
                    className={activeMenuIndex === 0 ? styles.labelRowActive : styles.labelRow}>
                    <div>Daily Sheet</div>
                </div>
                <div onClick={() => {displayGraphs(); props.displayGraphs();}}
                    className={activeMenuIndex === 1 ? styles.labelRowActive : styles.labelRow}>
                    <div>Graphs</div>
                </div>
                <div onClick={() => {displaySupport(); props.displaySupport();}} 
                    className={activeMenuIndex === 2 ? styles.labelRowActive : styles.labelRow}>
                    <div>Support me I'm begging you</div>
                </div>
            </div>

            <div className={styles.logoutButton} onClick={handleLogout}>
                <FontAwesomeIcon style={{marginRight: 10, marginLeft: 10}} icon={faUserLock} />
                <div>Logout</div>
            </div>
        </CardShadow>
    )
}

export default ControlPanel;