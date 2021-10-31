import React, { useState } from "react";
import IndexScreen from "../Screens/IndexScreen"
import ProfilScreen from "../Screens/ProfilScreen"
import RegisterScreen from "../Screens/RegisterScreen"
import { UserInfos } from "../Contexts/UserInfos";
import { Route, Switch, Redirect } from 'react-router'
import LoginScreen from "../Screens/LoginScreen";

const AppNavigator = () => {
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const setAuth = (boolean) => {
        setIsLoggedIn(boolean);
    };

    return (
        <UserInfos.Provider value={{ IsLoggedIn, setIsLoggedIn }}>
            <Switch>
                <Route exact path="/">
                    <IndexScreen />
                </Route>
                <Route exact path="/profil" render={props => IsLoggedIn ?
                    <ProfilScreen {...props} setAuth={setAuth} /> :
                    <Redirect to="/" />}>
                </Route>

                <Route exact path="/login">
                    <LoginScreen />
                </Route>

                <Route exact path="/register" render={props => !IsLoggedIn ?
                    <RegisterScreen {...props} setAuth={setAuth} /> :
                    <Redirect to="/" />}>
                </Route>
            </Switch>
        </UserInfos.Provider>
    );
};

export default AppNavigator;