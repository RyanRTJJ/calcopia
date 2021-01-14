import React, { useState, useContext } from 'react';
import styles from "../styles/loginscreen.module.css";
import CardShadow from "../components/CardShadow";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../constants";
import UserContext from "../context/UserContext";

const LoginScreen = () => {
    let history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const [generalErrorMessage, setGeneralErrorMessage] = useState("");

    const bringToRegistration = () => {
        history.push('/register')
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("triggered");

        setGeneralErrorMessage("");

        const email = document.getElementById("email").value.toLowerCase();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            setGeneralErrorMessage("*All fields required!");
            return;
        }

        axios.post(API_URL + "/users/login", { email: email, password: password })
            .then(res => {
                if (res.data.value === -1) {
                    // -1 is the code for invalid email
                    setGeneralErrorMessage("Are you sure you got your email right?");
                }
                else if (res.data.value === 1) {
                    setGeneralErrorMessage("Wrong password.");
                }
                else {
                    console.log("Logged In");
                    console.log(res.data);
                    setUserData({
                        user: res.data.user,
                        token: res.data.token
                    });
                    localStorage.setItem("auth-token", res.data.token);
                    history.push('/');
                }
            })

    }

    return (
        <div className={styles.imageBackground}>
            <CardShadow
                style={
                    {height: 500,
                    width: '50%',
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingTop: 15, 
                    paddingBottom: 15, 
                    justifyContent: "flex-start"}
                }
            >
                <div className={styles.introduction}>
                    <h1 className={styles.centralize}>Caloric Cornucopia</h1>
                    <small className={styles.centralize} style={{marginBottom: 0}}>Come with Me, And You'll See...</small>
                    <small className={styles.centralize}>The Garbage that you're always eating!~~~</small>
                </div>

                <form className={styles.formFields} onSubmit={handleLogin}>
                    <div className={styles.fieldRow}>
                        <div className={styles.inputLabel}>Email: </div>
                        <input type="text" id="email" className={styles.inputField} />
                    </div>
                    <div className={styles.fieldRow}>
                        <div className={styles.inputLabel}>Password: </div>
                        <input type="password" id="password" className={styles.inputField} />
                    </div>
                    <small style={{
                        marginLeft: 'auto', 
                        marginRight: 'auto', 
                        marginTop: 10, 
                        marginBottom: 10, 
                        fontWeight: "bold", 
                        visibility: 'visible'}}>
                            {generalErrorMessage}
                    </small>
                    <button type="submit" className={styles.registerButton}>
                        Login
                    </button>
                </form>

                <div className={styles.registerPrompt}>
                    <small>Haven't registered yet? What a SHAME...</small>
                    <div onClick={bringToRegistration} className={styles.registerButton}>
                        Give me an account!
                    </div>
                </div>
            </CardShadow>
        </div>
    )
}

export default LoginScreen;