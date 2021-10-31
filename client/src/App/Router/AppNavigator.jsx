import React, { useState } from "react";
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
    console.log(isAuthenticated)
  
    return (
        <Switch>
            <Route exact path="/">
                <IndexScreen/>
            </Route>
            <Route exact path="/profil" render={props => isAuthenticated ?
                <ProfilScreen {...props} setAuth={setAuth} /> : 
                <Redirect to="/" />}>
            </Route>

            <Route exact path="/login">
                <LoginScreen/>
            </Route>
            
            <Route exact path="/register" render={ props => !isAuthenticated ? 
                <RegisterScreen {...props} setAuth={setAuth} /> : 
                <Redirect to="/" /> }>
            </Route>
        </Switch>
    );
};

export default AppNavigator;