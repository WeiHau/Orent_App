import React from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  StatusBar,
  Platform,
} from "react-native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const MessageTitle = (props) => (
  <View style={{ marginBottom: 20 }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Roboto",
      }}
    >
      Messages
    </Text>
    <Text
      style={{
        color: "#888",
        fontFamily: "sans-serif-light",
      }}
    >
      Chat with someone in Orent!
    </Text>
  </View>
);

// props: visible, onshow, hideModal, styles, children
export const NewMessageModal = (props) => (
  <Modal
    transparent={true}
    animationType={"fade"}
    visible={props.visible}
    onShow={props.onShow}
  >
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.5)",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={props.hideModal}
    >
      <TouchableWithoutFeedback>
        <View
          style={{
            width: "80%",
            height: "30%",
            backgroundColor: "white",
            borderRadius: 8,
            overflow: "hidden",
            justifyContent: "space-around",
            ...props.styles,
          }}
        >
          {props.children}
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  </Modal>
);

// props: item, navigation
export const UserMessage = ({ item, navigation }) => {
  dayjs.extend(relativeTime);

  let noOfUnreadMessages = 0;

  for (let message of item.messages) {
    if (message.seen) break;

    if (!message.amSender) {
      noOfUnreadMessages++;
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Chat", { handle: item.user.handle });
      }}
      style={{ backgroundColor: "#fff", elevation: 2, marginVertical: 2 }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: "4%",
          paddingVertical: "3%",
        }}
      >
        <View
          style={{
            borderRadius: 40,
            overflow: "hidden",
            marginRight: "4%",
          }}
        >
          <Image
            source={{ uri: item.user.imageUri }}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#ccc",
            paddingHorizontal: "3%",
            borderLeftWidth: 0.5,
            borderColor: "#aaa",
            // justifyContent: "space-evenly",
            // backgroundColor: "red",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flex: 1, marginTop: "1%", marginBottom: "2%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                }}
                numberOfLines={1}
              >
                {item.user.fullName}
              </Text>
            </View>
            {item.messages.length > 0 && (
              <View>
                <Text style={{ color: "#aaa", fontSize: 12 }} numberOfLines={1}>
                  {dayjs(item.messages[0].createdAt).fromNow()}
                </Text>
              </View>
            )}
          </View>
          {item.messages.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text numberOfLines={2} style={{ color: "#555" }}>
                  {item.messages[0].content}
                </Text>
              </View>
              {noOfUnreadMessages > 0 && (
                <View
                  style={{
                    width: 30,
                    height: 30, //aspectRatio: 1,
                    marginLeft: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    backgroundColor: "#fbb124",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    {noOfUnreadMessages}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// message/chat components
import { BackIcon2 } from "../util/icons";
import store from "../redux/store";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
export const ChatHeader = (props) => {
  if (!props.data || !props.data.user) return null;

  const { user } = props.data;

  return (
    <View
      style={{
        padding: 8,
        paddingTop: STATUSBAR_HEIGHT + 5,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "#fff",
        marginBottom: 40,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{ marginLeft: 5 }}
      >
        <View
          style={{
            padding: 5,
            marginRight: 15,
            borderRadius: 25,
          }}
        >
          <BackIcon2 size={24} style={{}} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          store.dispatch({
            type: "SET_USER_DATA",
            payload: { changeUser: user.handle },
          });
          props.navigation.navigate("App", {
            screen: "Home",
            params: {
              screen: "Home",
              params: {
                screen: "User",
                params: { handle: user.handle },
              },
            },
          });
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{ borderRadius: 30, overflow: "hidden", marginRight: 10 }}
          >
            <Image
              source={{ uri: user.imageUri }}
              style={{ width: 45, height: 45 }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {user.fullName}
            </Text>
            <Text
              style={{ fontSize: 12, color: "#888" }}
            >{`@${user.handle}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
