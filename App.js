// Programmer Name     : Lim Wei Hau
// Program Name        : App.js
// Description         : The 'main' file that runs after compile
// First Written on    : 20 December 2020
// Last Edited on      : 03 March 2021

import React from "react";

// screen navigations
import { NavigationContainer } from "@react-navigation/native";

// axios setup
import axios from "axios";
axios.defaults.baseURL = "http://192.168.0.168:5000/api"; // development
// axios.defaults.baseURL = "https://apu-fyp-api.herokuapp.com/api"; // production

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

import Splash from "./Splash";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Splash />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
