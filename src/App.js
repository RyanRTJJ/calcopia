import './App.css';
import React, { useState, useEffect } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserContext from "./context/UserContext";
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      axios.post("http://localhost:5000/users/tokenIsValid",
        null, 
        { headers: { "x-auth-token": token }}
      )
        .then(tokenRes => { // tokenRes is a true / false, as per the tokenIsValid API call.
          console.log("User logged in: " + tokenRes.data);
          if (tokenRes.data) {
            // If yes, there's a user logged in. Who is it?:
            axios.get("http://localhost:5000/users/", { headers: { "x-auth-token": token }})
              .then(user => {
                setUserData({ token: token, user: user.data });
                new Promise(r => setTimeout(r, 1000)).then(() => {
                  setIsLoading(false);
                })
              })
              .catch(err => {
                console.log(err);
              })
          }
          else {
            // No user logged in. Do nothing.
            new Promise(r => setTimeout(r, 1000)).then(() => {
              setIsLoading(false);
            })
          }
        })
        .catch(err => {
          console.log(err);
          new Promise(r => setTimeout(r, 1000)).then(() => {
            setIsLoading(false);
          })
        });
    }

    checkLoggedIn();
  }, [])

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Route path="/" exact
          component={ isLoading ? LoadingScreen : !userData.user ? LoginScreen : HomeScreen}/>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;