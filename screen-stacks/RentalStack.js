// Programmer Name     : Lim Wei Hau
// Program Name        : RentalStack.js
// Description         : React navigaton - rental stack screens
// First Written on    : 30 January 2021
// Last Edited on      : 03 March 2021

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// pages
import activities from "../pages/rental-activities";
import requests from "../pages/rental-requests";

const RentalStack = createStackNavigator();
export default RentalStackScreen = () => (
  <RentalStack.Navigator headerMode="none">
    <RentalStack.Screen
      name="Activities"
      component={activities}
      options={{ title: "Rental Activities" }}
    />
    <RentalStack.Screen
      name="Requests"
      component={requests}
      options={{ title: "Rental Requests" }}
    />
  </RentalStack.Navigator>
);
