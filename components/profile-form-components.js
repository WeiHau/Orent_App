// Programmer Name     : Lim Wei Hau
// Program Name        : profile-form-components.js
// Description         : The UI components for page 'profile-edit.js'
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import { WhatsappIcon } from "../util/icons";

export const DetailsTitle = (props) => (
  <View style={{ marginBottom: 20 }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 35,
        marginVertical: 10,
        fontFamily: "Roboto",
      }}
    >
      Personal Details
    </Text>
    <Text
      style={{
        fontSize: 16,
        color: "#aaa",
        fontFamily: "sans-serif-light",
        fontWeight: "bold",
      }}
    >
      Please fill in the information below.
    </Text>
  </View>
);

export const HandleTitle = (props) => (
  <View
    style={{
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontWeight: "bold", fontSize: 24 }}>{props.handle}</Text>
  </View>
);

export const ProfileImage = (props) => {
  const { imageUri, pickImage } = props;

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: "50%",
          aspectRatio: 1,
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "flex-end",
          }}
          source={{
            uri: imageUri
              ? imageUri
              : "https://firebasestorage.googleapis.com/v0/b/apu-fyp-3cfd9.appspot.com/o/no-img.png?alt=media",
          }}
        >
          <TouchableOpacity
            onPress={pickImage}
            style={{
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>EDIT</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
};

export const WhatsappCheckBox = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#888" }}>WhatsApp</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <WhatsappIcon
          color={props.disabled || !props.value ? "#888" : "#fbb124"}
          style={{ paddingHorizontal: 10 }}
        />
        <CheckBox {...props} />
      </View>
    </View>
  );
};

export const LogoutText = (props) => {
  const { userHandle } = props;

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Text
        style={{ color: "#888" }}
      >{`Logged in as ${userHandle}. Not you? `}</Text>
      <Text
        style={{ fontWeight: "bold", color: "#fbb124" }}
        onPress={() => {
          props.logout();
        }}
      >
        Logout
      </Text>
    </View>
  );
};
