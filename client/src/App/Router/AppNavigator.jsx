import React, { useState, useEffect } from "react";
import IndexScreen from "../Screens/IndexScreen"
import ProfilScreen from "../Screens/ProfilScreen"
import PublicProfilScreen from "../Screens/PublicProfilScreen";
import RegisterScreen from "../Screens/RegisterScreen"
import { UserInfos } from "../Contexts/UserInfos";
import { Route, Switch } from 'react-router'
import LoginScreen from "../Screens/LoginScreen";

const AppNavigator = () => {
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const setAuth = (boolean) => {
        setIsLoggedIn(boolean);
    };
    async function isAuth() {
        try {
            const response = await fetch("http://localhost:5000/auth/is-verified", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json()
            parseRes === true ? setIsLoggedIn(true) :
                setIsLoggedIn(false)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        isAuth();
    }, []);

    return (
        <UserInfos.Provider value={{ IsLoggedIn, setIsLoggedIn }}>
            <Switch>
                <Route exact path="/">
                    <IndexScreen />
                </Route>
                <Route exact path="/profil" >
                    {IsLoggedIn ? <ProfilScreen setAuth={setAuth} /> : <IndexScreen />}
                </Route>
                <Route exact path="/public">
                    {IsLoggedIn ? <PublicProfilScreen setAuth={setAuth} /> : <IndexScreen />}
                </Route>
                <Route exact path="/login" >
                    {!IsLoggedIn ? <LoginScreen setAuth={setAuth} /> : <IndexScreen />}
                </Route>
                <Route exact path="/register">
                    {!IsLoggedIn ? <RegisterScreen setAuth={setAuth} /> : <IndexScreen />}
                </Route>
            </Switch>
        </UserInfos.Provider>
    );
};

export default AppNavigator;