// Programmer Name     : Lim Wei Hau
// Program Name        : message-chat.js
// Description         : The UI for chatting page
// First Written on    : 10 January 2021
// Last Edited on      : 03 March 2021

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useSocket } from "../util/SocketProvider";

// redux
import { connect } from "react-redux";
import { setMessage, sendMessage } from "../redux/actions/dataActions";

// util/components
import { FlatListContainer } from "../util/containers";
import { ChatHeader } from "../components/message-components";
import { SendIcon } from "../util/icons";
import ScreenLoadingModal from "../util/ScreenLoadingModal";

import dayjs from "dayjs";

const Messages = (props) => {
  let data = props.message;

  if (!data || !data.messages) data.messages = [];

  const flatlistRef = useRef();

  const renderItem = ({ item, index }) => {
    let displayTimeStamp = true;
    let sameSender = true;
    // if message isn't the top message
    if (index !== data.messages.length - 1) {
      // previous chat item
      let prevMessage = data.messages[index + 1];

      displayTimeStamp = !dayjs(prevMessage.createdAt).isSame(
        item.createdAt,
        "day"
      );
      sameSender = prevMessage.amSender === item.amSender;
    }

    return (
      <View
        style={{
          marginTop: sameSender ? 2 : 8,
          marginBottom: !index ? 5 : 0,
          width: "100%",
        }}
      >
        {displayTimeStamp && (
          <View
            style={{
              alignSelf: "center",
              paddingHorizontal: 10,
              paddingVertical: 5,
              elevation: 1,
              borderRadius: 15,
              marginVertical: 10,
              // backgroundColor: "#defade",
              backgroundColor: "#deeff5",
            }}
          >
            <Text style={{ color: "#555", textTransform: "uppercase" }}>
              {dayjs(item.createdAt).format("D MMMM YYYY")}
            </Text>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            maxWidth: "80%",
            marginHorizontal: 10,
            backgroundColor: item.amSender ? "#feddb6" : "#fff",
            borderRadius: 8,
            alignSelf: item.amSender ? "flex-end" : "flex-start",
          }}
        >
          <Text style={{ fontSize: 14 }}>{item.content}</Text>
          <Text
            style={{
              fontSize: 10,
              marginTop: 2,
              color: "#777",
              textAlign: "right",
            }}
          >
            {dayjs(item.createdAt).format("h:mm a")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatlistRef}
      onContentSizeChange={() => {
        if (!data.messages.length) return;
        flatlistRef.current.scrollToIndex({ index: 0, animated: true });
      }}
      style={{ marginTop: 60 }}
      data={data.messages}
      renderItem={renderItem}
      keyExtractor={(item, index) => index + ""}
      inverted
    />
  );
};

const InputField = (props) => {
  const { sendMessage, draft, setDraft } = props;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TextInput
        value={draft}
        onChangeText={(e) => setDraft(e)}
        multiline
        style={{
          flex: 1,
          backgroundColor: "#fff",
          minHeight: 50,
          paddingHorizontal: 15,
        }}
      />
      <TouchableOpacity
        onPress={sendMessage}
        style={{
          height: "100%",
          backgroundColor: "#fbb124",
          padding: 14,
          paddingRight: 17,
          alignItems: "center",
        }}
      >
        <SendIcon style={{ color: "#fff", alignSelf: "center" }} />
      </TouchableOpacity>
    </View>
  );
};

const chat = (props) => {
  let handle = useRef(props.route.params.handle).current;

  useEffect(() => {
    props.setMessage(handle);
    return () => {
      props.setMessage();
    };
  }, []);

  useEffect(() => {
    if (props.message && props.message.error) {
      // userHandle not exist
      Alert.alert(
        "User handle not found",
        `Account with handle '${handle}' does not exist`,
        [
          {
            text: "OK",
            onPress: () => {
              props.setMessage();
              props.navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [props.message]);

  const [draft, setDraft] = useState("");

  const socket = useSocket();
  const sendMessage = () => {
    // validate draft
    if (draft.trim().length == 0) return;

    const messageObj = {
      sender: props.userHandle,
      senderFullName: props.userFullName,
      recipient: handle,
      recipientPushToken: props.message.user.expoPushToken,
      content: draft,
      createdAt: new Date().toISOString(),
      seen: false,
    };
    setDraft("");
    socket.emit("send-message", messageObj);
    props.sendMessage(messageObj);
  };

  return (
    <FlatListContainer>
      <ChatHeader data={props.message} navigation={props.navigation} />
      <Messages message={props.message} />
      <InputField sendMessage={sendMessage} draft={draft} setDraft={setDraft} />
      {props.message && props.message.loading && <ScreenLoadingModal />}
    </FlatListContainer>
  );
};

const mapStateToProps = (state) => ({
  message: state.data.message,
  userHandle: state.user.credentials.handle,
  userFullName: state.user.credentials.fullName,
});

const mapActionsToProps = {
  setMessage,
  sendMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(chat);
