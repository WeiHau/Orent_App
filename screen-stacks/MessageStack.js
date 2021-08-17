// Programmer Name     : Lim Wei Hau
// Program Name        : MessageStack.js
// Description         : React navigaton - messages stack screens
// First Written on    : 30 January 2021
// Last Edited on      : 03 March 2021

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
