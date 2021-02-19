import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

// pages
import login from "../pages/auth-login";
import signup from "../pages/auth-signup";

const AuthStack = createStackNavigator();
export default AuthStackScreen = () => (
  <AuthStack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <AuthStack.Screen
      name="Login"
      component={login}
      options={{ title: "Log In" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={signup}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);
