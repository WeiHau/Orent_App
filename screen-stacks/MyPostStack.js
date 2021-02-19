import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// pages
import home from "../pages/mypost-home";
import addpost from "../pages/mypost-addpost";
import editpost from "../pages/mypost-editpost";

const MyPostStack = createStackNavigator();
export default MyPostStackScreen = () => (
  <MyPostStack.Navigator headerMode="none">
    <MyPostStack.Screen
      name="Home"
      component={home}
      options={{ title: "My Posts" }}
    />
    <MyPostStack.Screen
      name="AddPost"
      component={addpost}
      options={{ title: "Add Post" }}
    />
    <MyPostStack.Screen
      name="EditPost"
      component={editpost}
      options={{ title: "Edit Post" }}
    />
  </MyPostStack.Navigator>
);
