import React, { useState, useContext } from 'react';
import CardShadow from '../components/CardShadow';
import styles from "../styles/registerscreen.module.css";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';
import UserContext from "../context/UserContext";
import { API_URL } from "../constants";

const RegisterScreen = () => {
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const {userData, setUserData} = useContext(UserContext);
    let history = useHistory();

    const handleRegister = (e) => {
        e.preventDefault();
        // Clear all errorMessages first.
        setEmailErrorMessage("");
        setPasswordErrorMessage("");

        var email = (document.getElementById("email").value.toLowerCase());
        var password = document.getElementById("password").value;
        var confirmedPassword = document.getElementById("confirmpassword").value;

        if (!email || !password || !confirmedPassword) {
            setEmailErrorMessage("All fields are required!");
            return;
        }

        console.log("Checkpoint1");

        axios.post(API_URL + "/users/checkemail", { email: email })
            .then(res => {
                console.log(res.data);
                if (res.data.value === -1) {
                    setEmailErrorMessage("*An account with this email already exists!");
                    console.log("returning");
                    return;
                }
                else {
                    // Email available. Check passwords match.
                    if (password !== confirmedPassword) {
                        setPasswordErrorMessage("*Your passwords do not match!");
                    }
                    else {
                        bcrypt.genSalt().then(salt => {
                            bcrypt.hash(password, salt).then(hashedPassword => {
                                axios.post(API_URL + "/users/add", {
                                    "email": email, "password": hashedPassword
                                }).then(() => {
                                    console.log("reseted user data");
                                    localStorage.setItem("auth-token", undefined);
                                    history.push("/");
                                    
                                }).catch(err => console.log(err))
                            })
                        })
                    }
                }
            })
            .catch((err) => {console.log(err)});
    }
    return (
        <div className={styles.imageBackground}>
            <CardShadow
                    style={
                        {height: 450,
                        width: '50%',
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingTop: 15, 
                        paddingBottom: 15, 
                        justifyContent: "flex-start"}
                    }
                >
                    <div className={styles.introduction}>
                        <h1 className={styles.centralize}>Register</h1>
                        <small className={styles.centralize} style={{marginBottom: 0}}>All I need is your email and a password.</small>
                        <small className={styles.centralize} style={{marginBottom: 0}}>You'll be able to save your nutritional history and analyze it using this account!</small>
                    </div>

                    <form onSubmit={handleRegister} className={styles.formFields} >
                        <div className={styles.fieldRow}>
                            <div className={styles.inputLabel}>Email: </div>
                            <div className={styles.inputErrorPair}>
                                <input type="text" id="email" className={styles.inputField} />
                                <small style={{fontWeight: "bold", visibility: 'visible'}}>{emailErrorMessage}</small>
                            </div>
                        </div>
                        <div className={styles.fieldRow}>
                            <div className={styles.inputLabel}>Password: </div>
                            <div className={styles.inputErrorPair}>
                                <input type="password" id="password" className={styles.inputField} />
                            </div>
                        </div>
                        <div className={styles.fieldRow}>
                            <div className={styles.inputLabel}>Confirm Password: </div>
                            <div className={styles.inputErrorPair}>
                                <input type="password" id="confirmpassword" className={styles.inputField} />
                                <small style={{fontWeight: "bold", visibility: 'visible'}}>{passwordErrorMessage}</small>
                                </div>
                        </div>
                        <button type="submit" className={styles.registerButton}>
                            Register
                        </button>
                    </form>

                </CardShadow>
        </div>
    )
}

export default RegisterScreen;