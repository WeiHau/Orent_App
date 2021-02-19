import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  RefreshControl,
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

const Messages = (props) => {
  let data = props.message;

  if (!data || !data.messages || data.messages.length === 0) data = [];

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 4, width: "100%" }}>
        <View
          style={{
            padding: 10,
            marginHorizontal: 8,
            backgroundColor: item.amSender ? "#fccf3f" : "#fff",
            borderRadius: 5,
            alignSelf: item.amSender ? "flex-end" : "flex-start",
          }}
        >
          <Text style={{ fontSize: 14 }}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={{ marginTop: 65 }}
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
          // borderRadius: 25,
          padding: 14,
          paddingRight: 17,
          alignItems: "center",
          // justifyContent: "center",
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
      recipient: handle,
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
});

const mapActionsToProps = {
  setMessage,
  sendMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(chat);
