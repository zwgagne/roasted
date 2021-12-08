import React, { useState, useEffect } from "react";
import IndexScreen from "../Screens/IndexScreen"
import ProfilScreen from "../Screens/ProfilScreen"
import PublicProfilScreen from "../Screens/PublicProfilScreen";
import RegisterScreen from "../Screens/RegisterScreen"
import { UserInfos } from "../Contexts/UserInfos";
import { ScoreLvl } from "../Contexts/ScoreLvl";
import { Route, Switch } from 'react-router'
import LoginScreen from "../Screens/LoginScreen";

const AppNavigator = () => {
    let scoreDb = localStorage.score = 2; //Fetch score user db
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [score, setScore] = useState(scoreDb)
    useEffect(() => {
        pushToDB()
    }, [score])
    const pushToDB = () => {
        let newScore = score
        localStorage.score = newScore // Push le nouveau score ici
    }

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
            <ScoreLvl.Provider value={{ score, setScore }} >
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
            </ScoreLvl.Provider>
        </UserInfos.Provider>
    );
};

export default AppNavigator;