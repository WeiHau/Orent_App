// Programmer Name     : Lim Wei Hau
// Program Name        : auth-components.js
// Description         : The UI components for page 'auth-login.js' and 'auth-signup.js'
// First Written on    : 23 December 2020
// Last Edited on      : 03 March 2021

import React from "react";
import { View, Text } from "react-native";

export const LoginTitle = (props) => (
  <View style={{ marginVertical: 20 }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 35,
        marginVertical: 10,
        fontFamily: "Roboto",
      }}
    >
      Login
    </Text>
    <Text
      style={{
        fontSize: 16,
        color: "#aaa",
        fontFamily: "sans-serif-light",
        fontWeight: "bold",
      }}
    >
      Please sign in to continue.
    </Text>
  </View>
);

export const SignUpText = ({ navigation }) => (
  <View style={{ flexDirection: "row", justifyContent: "center" }}>
    <Text style={{ color: "#888" }}>Don't have an account? </Text>
    <Text
      style={{ fontWeight: "bold", color: "#fbb124" }}
      onPress={() => {
        navigation.navigate("CreateAccount");
      }}
    >
      Sign up
    </Text>
  </View>
);

export const SignUpTitle = (props) => (
  <View style={{ marginVertical: 20 }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 35,
        marginVertical: 10,
        fontFamily: "Roboto",
      }}
    >
      Create Account
    </Text>
    <Text
      style={{
        fontSize: 16,
        color: "#aaa",
        fontFamily: "sans-serif-light",
        fontWeight: "bold",
      }}
    >
      Create an account to get started.
    </Text>
  </View>
);

export const LoginText = ({ navigation }) => (
  <View style={{ flexDirection: "row", justifyContent: "center" }}>
    <Text style={{ color: "#888" }}>Already have an account? </Text>
    <Text
      style={{ fontWeight: "bold", color: "#fbb124" }}
      onPress={() => {
        navigation.navigate("Login");
      }}
    >
      Login
    </Text>
  </View>
);
