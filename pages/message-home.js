// Programmer Name     : Lim Wei Hau
// Program Name        : message-home.js
// Description         : The UI for messages page
// First Written on    : 10 January 2021
// Last Edited on      : 03 March 2021

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import * as Notifications from "expo-notifications";

// redux
import { connect } from "react-redux";
import { getMessages, setMessageUser } from "../redux/actions/dataActions";

// components/util
import { FlatListContainer } from "../util/containers";
import {
  MessageTitle,
  NewMessageModal,
  UserMessage,
} from "../components/message-components";
import { MyButton2, MyTextInput } from "../util/my-form-elements";

// icons
import { PlusIcon, BackIcon, MessageIcon } from "../util/icons";

const UserMessages = (props) => {
  let data = props.messages;

  if (!data) data = [];

  if (data && data.length === 0) {
    return (
      <View style={{ margin: 50, flex: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#888" }}>No message yet...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <UserMessage item={item} navigation={props.navigation} />
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={data.loading}
          onRefresh={() => props.getMessages()}
        />
      }
      data={data.loading ? [] : data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index + ""}
    />
  );
};

const home = (props) => {
  // useEffect(() => {
  //   props.getMessages();
  // }, []);

  useEffect(() => {
    if (!props.messages.loading && props.messageUser) {
      console.log("messageUser: " + props.messageUser);
      props.navigation.navigate("Chat", { handle: props.messageUser });
      props.setMessageUser(null);
    }
  }, [props.messages, props.messageUser]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // Screen was focused
      // clear notifications
      Notifications.dismissAllNotificationsAsync();
    });

    return unsubscribe;
  }, [props.navigation]);

  const [modalVisible, setModalVisible] = useState(false);
  const [userHandle, setUserHandle] = useState("");

  return (
    <FlatListContainer>
      <NewMessageModal
        visible={modalVisible}
        hideModal={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ padding: "8%" }}>
          <Text>New message to...</Text>
          <MyTextInput
            placeholder="Enter recipient user handle"
            value={userHandle}
            onChangeText={(e) => setUserHandle(e)}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <MyButton2
              onPress={() => {
                setModalVisible(false);
              }}
              style={{ width: "20%" }}
            >
              <BackIcon style={{ color: "#f45c57" }} />
            </MyButton2>
            <MyButton2
              onPress={() => {
                setUserHandle("");
                setModalVisible(false);
                props.navigation.navigate("Chat", { handle: userHandle });
              }}
              style={{ width: "20%" }}
            >
              <MessageIcon style={{ color: "#fbb124" }} />
            </MyButton2>
          </View>
        </View>
      </NewMessageModal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
        }}
      >
        <MessageTitle />
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            borderRadius: 25,
            padding: 10,
            marginBottom: 20,
            flexDirection: "row",
            backgroundColor: "#fff",
            elevation: 3,
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <PlusIcon size={20} style={{ color: "#fbb124", marginRight: 5 }} />
          <Text style={{ color: "#fbb124", fontWeight: "bold" }}>
            NEW MESSAGE
          </Text>
        </TouchableOpacity>
      </View>
      <UserMessages
        navigation={props.navigation}
        messages={props.messages}
        getMessages={props.getMessages}
      />
    </FlatListContainer>
  );
};

const mapStateToProps = (state) => ({
  messages: state.data.messages,
  messageUser: state.data.messageUser,
});

const mapActionsToProps = {
  getMessages,
  setMessageUser,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
