// Programmer Name     : Lim Wei Hau
// Program Name        : HomeStack.js
// Description         : React navigaton - home stack (containing all 5 tabs)
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React, { useEffect, useRef } from "react";
import { Platform, AppState } from "react-native";
import * as Notifications from "expo-notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens/stacks
import PostStack from "./PostStack";
import MessageStack from "./MessageStack";
import MyPostStack from "./MyPostStack";
import ProfileStack from "./ProfileStack";
import RentalStack from "./RentalStack";

// redux
import { connect } from "react-redux";
import { setExpoPushToken } from "../redux/actions/userActions";
import { getMessages, setMessageUser } from "../redux/actions/dataActions";

// icons
import { AntDesign } from "@expo/vector-icons";

// socket.io
import { SocketProvider } from "../util/SocketProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeStack = createBottomTabNavigator();
const HomeStackScreen = (props) => {
  const responseListener = useRef();
  const notificationListener = useRef();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    props.getMessages();

    AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
    });

    registerForPushNotificationsAsync().then((token) => {
      props.setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response);

        if (appState.current === "background") {
          // console.log(appState.current);
          // if app is backgrounded,
          props.getMessages(); // to re-get the messages
          // props.setMessageUser(
          //   response.notification.request.content.data.senderHandle
          // ); //setting messageUser to the sender
          // navigate to messages
          props.navigation.navigate("App", {
            screen: "Home",
            params: {
              screen: "Messages",
              params: {
                screen: "Home",
              },
            },
          });
        }
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
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
            else if (route.name === "My Rentals") iconName = "shoppingcart";
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
        <HomeStack.Screen name="My Rentals" component={RentalStack} />
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
  setExpoPushToken,
  setMessageUser,
};

export default connect(mapStateToProps, mapActionsToProps)(HomeStackScreen);

async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
