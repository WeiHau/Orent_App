import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";

export const MyTextInput = (props) => {
  const [focus, setFocus] = useState(false);
  const textInputRef = useRef(null);

  let { error, clearError, Icon } = props;

  const iconColor = error ? "#cc0000" : focus ? "#fbb124" : "#888";

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (props.textInputRef) props.textInputRef.current.focus();
        else textInputRef.current.focus();
      }}
    >
      <View style={{ ...props.viewStyle }}>
        <View
          style={{
            borderBottomWidth: 1,
            marginVertical: 5,
            borderColor: error ? "#ef9a9a" : focus ? "#fccf3f" : "#CCC",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 50,
              alignItems: "center",
              borderBottomWidth: 1,
              padding: 10,
              borderColor: iconColor,
            }}
          >
            {!!Icon && <Icon style={{ paddingRight: 10 }} color={iconColor} />}
            <TextInput
              ref={props.textInputRef || textInputRef}
              placeholderTextColor={iconColor}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
                if (error) clearError();
              }}
              style={{ width: "100%" }}
              {...props}
            />
          </View>
        </View>
        {error ? (
          <Text
            numberOfLines={1}
            style={{ color: "#cc0000", marginHorizontal: 10 }}
          >
            {error}
          </Text>
        ) : (
          <Text
            numberOfLines={1}
            style={{ color: "transparent", marginHorizontal: 10 }}
          >
            Some Text
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export const MyTextArea = (props) => {
  const [focus, setFocus] = useState(false);
  const textInputRef = useRef(null);

  let { error, clearError, Icon } = props;

  const iconColor = error ? "#cc0000" : focus ? "#fbb124" : "#888";

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        textInputRef.current.focus();
      }}
    >
      <View style={{ ...props.viewStyle }}>
        <View
          style={{
            borderBottomWidth: 1,
            marginVertical: 5,
            borderColor: error ? "#ef9a9a" : focus ? "#fccf3f" : "#CCC",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              padding: 10,
              borderColor: iconColor,
            }}
          >
            {!!Icon && <Icon style={{ paddingRight: 10 }} color={iconColor} />}
            <TextInput
              ref={textInputRef}
              placeholderTextColor={iconColor}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
                if (error) clearError();
              }}
              style={{ width: "100%" }}
              multiline={true}
              numberOfLines={2}
              {...props}
            />
          </View>
        </View>
        {error ? (
          <Text
            numberOfLines={1}
            style={{ color: "#cc0000", marginHorizontal: 10 }}
          >
            {error}
          </Text>
        ) : (
          <Text
            numberOfLines={1}
            style={{ color: "transparent", marginHorizontal: 10 }}
          >
            Some Text
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export const MyButton = (props) => (
  <TouchableOpacity
    style={{
      overflow: "hidden",
      borderRadius: 25,
      elevation: 3,
      ...props.style,
    }}
    onPress={props.onPress}
  >
    <View
      style={{
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fbb124",
      }}
    >
      {props.children}
    </View>
  </TouchableOpacity>
);

export const MyButton2 = (props) => (
  <TouchableOpacity
    style={{
      overflow: "hidden",
      borderRadius: 25,
      elevation: 3,
      ...props.style,
    }}
    onPress={props.onPress}
  >
    <View
      style={{
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {props.children}
    </View>
  </TouchableOpacity>
);

export const MyButton3 = (props) => (
  <TouchableOpacity
    style={{
      overflow: "hidden",
      borderRadius: 25,
      elevation: 3,
      ...props.style,
    }}
    onPress={props.onPress}
  >
    <View
      style={{
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f45c57",
      }}
    >
      {props.children}
    </View>
  </TouchableOpacity>
);

import { Picker } from "@react-native-picker/picker";
export const MyPicker = (props) => {
  const { options, selectedValue, onValueChange } = props;

  return (
    <View style={{ ...props.viewStyle }}>
      <View
        style={{
          borderBottomWidth: 1,
          marginVertical: 5,
          borderColor: "#CCC",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 50,
            alignItems: "center",
            borderBottomWidth: 1,
            paddingVertical: 0,
            borderColor: "#888",
          }}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={{ height: "100%", width: "100%" }}
          >
            {options.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

// intruders lolll
export const ExpandableText = (props) => {
  if (!props.children) return null;

  const [readStatus, setReadStatus] = useState(0); //-1 being (readless) enabled, 1 being (readmore) enabled, 0 being none (max line not hit)
  const maxLine = props.maxLine ? props.maxLine : 5;

  return (
    <View style={{ ...props.style }}>
      <TouchableWithoutFeedback
        disabled={readStatus === 0}
        onPress={() => {
          setReadStatus((readStatus) => {
            return readStatus === 1 ? -1 : 1;
          });
        }}
      >
        <View>
          <Text
            numberOfLines={readStatus === 1 ? maxLine : undefined}
            onTextLayout={(e) => {
              //if number of lines now exceeds maxline, and readmore isnt enabled
              //set numoflines to maxline in text, and enable readmore (initial)
              //if readmore is clicked, change numoflines to undefined
              //if number of lines now exceeds maxline, and readmore is enabled,
              //enable readless
              //if readless is clicked, changed numoflines to maxline

              if (e.nativeEvent.lines.length > maxLine && readStatus === 0) {
                setReadStatus(1);
              }
            }}
          >
            {props.children}
          </Text>
          {readStatus !== 0 && (
            <Text style={{ color: "grey", padding: 5 }}>
              {readStatus === 1 ? "...read more" : "...read less"}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// need Icon, color, linkUrl, iconSize, appName
export const ContactButton = (props) => {
  const { Icon, linkUrl, color, appName, iconSize } = props;

  const openUrl = async (url) => {
    if (await Linking.canOpenURL(url)) Linking.openURL(url);
    else
      Alert.alert(
        `Failed to launch ${appName}`,
        `Please make sure ${appName} is installed`
      );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        openUrl(linkUrl);
      }}
    >
      <View
        style={{
          borderRadius: 30,
          padding: 8,
          alignItems: "center",
          justifyContent: "center",
          elevation: 3,
          backgroundColor: "#fff",
        }}
      >
        {Icon && <Icon color={color} size={iconSize} />}
      </View>
    </TouchableOpacity>
  );
};

import { useNavigation } from "@react-navigation/native";
import store from "../redux/store";
export const ChatButton = (props) => {
  const { Icon, color, iconSize, handle } = props;
  const navigation = useNavigation();

  const toChat = () => {
    store.dispatch({
      type: "MESSAGE_USER",
      payload: handle,
    });
    navigation.navigate("App", {
      screen: "Home",
      params: {
        screen: "Messages",
        params: {
          screen: "Home",
        },
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        toChat();
      }}
    >
      <View
        style={{
          borderRadius: 30,
          padding: 8,
          alignItems: "center",
          justifyContent: "center",
          elevation: 3,
          backgroundColor: "#fff",
        }}
      >
        {Icon && <Icon color={color} size={iconSize} />}
      </View>
    </TouchableOpacity>
  );
};
