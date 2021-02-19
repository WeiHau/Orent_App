import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screens/stacks
import HomeStack from "./HomeStack";
import details from "../pages/app-details";

// redux store
import store from "../redux/store";

// either home or fill in details
const AppStack = createStackNavigator();

export default AppStackScreen = (props) => {
  const { user } = store.getState();

  return (
    <AppStack.Navigator headerMode="none">
      {user.credentials.fullName ? (
        <AppStack.Screen name="Home" component={HomeStack} />
      ) : (
        <AppStack.Screen name="CompleteDetails" component={details} />
      )}
    </AppStack.Navigator>
  );
};
