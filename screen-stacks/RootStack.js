import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screen stacks
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

// either signup/login or home/fillindetails
const RootStack = createStackNavigator();
export default RootStackScreen = ({ user }) => {
  return (
    <RootStack.Navigator headerMode="none">
      {user.authenticated ? (
        <RootStack.Screen
          name="App"
          component={AppStack}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};
