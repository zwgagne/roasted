import React, { useState, useEffect } from "react";
import IndexScreen from "../Screens/IndexScreen"
import ProfilScreen from "../Screens/ProfilScreen"
import RegisterScreen from "../Screens/RegisterScreen"

import { Route, Switch, Redirect } from 'react-router'
import LoginScreen from "../Screens/LoginScreen";

const AppNavigator = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
      setIsAuthenticated(boolean);
    };

    async function isAuth() {
        try {
            const response = await fetch("http://localhost:5000/auth/is-verified", {
                method: "GET",
                headers: { token:localStorage.token }
            }); 
            const parseRes = await response.json()
            parseRes === true ? setIsAuthenticated(true):
            setIsAuthenticated(false)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        isAuth();
    },[]);

    return (
        <Switch>
            <Route exact path="/">
                <IndexScreen />
            </Route>
            <Route exact path="/profil" render={props => isAuthenticated ?
                <ProfilScreen {...props} setAuth={setAuth} /> : 
                <Redirect to="/" />}>
            </Route>

            <Route exact path="/login" render={props => !isAuthenticated ?
                ( <LoginScreen {...props} setAuth={setAuth} /> ) :
                ( <Redirect to="/profil" /> ) }>
            </Route>
            
            <Route exact path="/register" render={ props => !isAuthenticated ? 
                <RegisterScreen {...props} setAuth={setAuth} /> : 
                <Redirect to="/" /> }>
            </Route>
        </Switch>
    );
};

export default AppNavigator;