// Programmer Name     : Lim Wei Hau
// Program Name        : ScreenLoadingModal.js
// Description         : util - often used UI for loading overlay
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React from "react";
import { View, ActivityIndicator } from "react-native";

const ScreenLoadingModal = (props) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)", //#F5FCFF88
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 5,
      elevation: 4,
    }}
  >
    <ActivityIndicator size="large" color="#999999" />
  </View>
);

export default ScreenLoadingModal;
