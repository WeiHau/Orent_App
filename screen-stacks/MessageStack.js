import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// pages
import home from "../pages/message-home";
import chat from "../pages/message-chat";

const MessageStack = createStackNavigator();
export default MessageStackScreen = () => (
  <MessageStack.Navigator headerMode="none">
    <MessageStack.Screen
      name="Home"
      component={home}
      options={{ title: "Home" }}
    />
    <MessageStack.Screen
      name="Chat"
      component={chat}
      options={{ title: "Chat" }}
    />
  </MessageStack.Navigator>
);
