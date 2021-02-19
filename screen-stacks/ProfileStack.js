import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// pages
import home from "../pages/profile-home";
import edit from "../pages/profile-edit";

const ProfileStack = createStackNavigator();
export default ProfileStackScreen = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen
      name="Home"
      component={home}
      options={{ title: "View profile" }}
    />
    <ProfileStack.Screen
      name="Edit"
      component={edit}
      options={{ title: "Edit profile" }}
    />
  </ProfileStack.Navigator>
);
