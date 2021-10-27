import React from "react"
import IndexScreen from "../Screens/IndexScreen"
import ProfilScreen from "../Screens/ProfilScreen"
import RegisterScreen from "../Screens/RegisterScreen"
import { Route, Switch } from 'react-router'

const AppNavigator = () => {
    return (
        <Switch>
            <Route exact path="/">
                <IndexScreen/>
            </Route>
            <Route exact path="/profil">
                <ProfilScreen/>
            </Route>
            <Route exact path="/register">
                <RegisterScreen/>
            </Route>
        </Switch>
    );
};

export default AppNavigator;