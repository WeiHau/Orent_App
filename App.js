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
import TestPage from "./pages/TestPage";

// ISSUE !!!
// https://github.com/facebook/react-native/issues/17530#issuecomment-416367184

//https://github.com/ReactNativeSchool/getting-started-react-navigation-v5

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Splash />
      </NavigationContainer>
    </Provider>
  );
};

// const App = () => {
//   return <TestPage />;
// };

export default App;

// user launch the app (app.js runs)
// app.js tries to login with existing credentials, while showing splash screen
// if not successful, navigate to login/signup screen.
// if successful, check if details are filled. then only the operation completes and proceed with navigation
// NOTE: each login, filled-in or auto, should check if details are filled, if yes, to home, else fillindetails screen
//   can do the check in login in userActions
//   login, fetch the user details (via another endpoint). if details are complete, home else fillindetails screen
//   still showing splash screen while fetching details
// so root component will contain login/signup & home/fillindetails both
