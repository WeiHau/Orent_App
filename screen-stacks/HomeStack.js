import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens/stacks
import PostStack from "./PostStack";
import MessageStack from "./MessageStack";
import MyPostStack from "./MyPostStack";
import ProfileStack from "./ProfileStack";

// redux
import { connect } from "react-redux";
import { getMessages } from "../redux/actions/dataActions";

// icons
import { AntDesign } from "@expo/vector-icons";

// socket.io
import { SocketProvider } from "../util/SocketProvider";

const HomeStack = createBottomTabNavigator();
const HomeStackScreen = (props) => {
  useEffect(() => {
    props.getMessages();
  }, []);

  let noOfUnreadMessages = 0;
  if (props.messages && !props.messages.loading) {
    for (let userMessage of props.messages) {
      for (let message of userMessage.messages) {
        if (message.seen) break;
        if (!message.amSender) {
          noOfUnreadMessages++;
        }
      }
    }
  }

  return (
    <SocketProvider handle={props.user.credentials.handle}>
      <HomeStack.Navigator
        initialRouteName={props.user.firstSignIn ? "Home" : "Profile"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Messages") iconName = "message1";
            else if (route.name === "My Posts")
              iconName = focused ? "smile-circle" : "smileo";
            else if (route.name === "Profile") iconName = "user";

            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#fbb124",
          inactiveTintColor: "gray",
        }}
      >
        <HomeStack.Screen name="Home" component={PostStack} />
        <HomeStack.Screen
          name="Messages"
          component={MessageStack}
          options={{
            tabBarBadge: noOfUnreadMessages !== 0 ? noOfUnreadMessages : null,
          }}
        />
        <HomeStack.Screen name="My Posts" component={MyPostStack} />
        <HomeStack.Screen name="Profile" component={ProfileStack} />
      </HomeStack.Navigator>
    </SocketProvider>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  messages: state.data.messages,
});

const mapActionsToProps = {
  getMessages,
};

export default connect(mapStateToProps, mapActionsToProps)(HomeStackScreen);
