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
