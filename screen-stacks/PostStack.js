// Programmer Name     : Lim Wei Hau
// Program Name        : PostStack.js
// Description         : React navigaton - all post stack screens
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

// pages
import posts from "../pages/post-posts";
import post from "../pages/post-post";
import user from "../pages/post-user";

const PostStack = createStackNavigator();
export default PostStackScreen = () => (
  <PostStack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <PostStack.Screen
      name="Posts"
      component={posts}
      options={{ title: "All Posts" }}
    />
    <PostStack.Screen
      name="Post"
      component={post}
      options={{ title: "Particular Post" }}
    />
    <PostStack.Screen
      name="User"
      component={user}
      options={{ title: "Particular User" }}
    />
  </PostStack.Navigator>
);
