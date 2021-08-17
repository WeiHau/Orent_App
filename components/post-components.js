// Programmer Name     : Lim Wei Hau
// Program Name        : post-components.js
// Description         : The UI components for page 'post-post.js'
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// redux
import store from "../redux/store";

// util/components
import {
  PhoneIcon,
  WhatsappIcon,
  FbIcon,
  IgIcon,
  FrownIcon,
  MessageIcon,
} from "../util/icons";
import { PostDetailContainer } from "../util/containers";
import {
  ExpandableText,
  ContactButton,
  ChatButton,
} from "../util/my-form-elements";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const NamePriceSection = (props) => (
  <PostDetailContainer>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>{props.name}</Text>
      </View>
      <View
        style={{
          paddingLeft: 15,
          borderLeftWidth: 1,
          borderColor: "#888",
          justifyContent: "center",
        }}
      >
        <Text style={{ alignSelf: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {props.price}
          </Text>
          <Text style={{ color: "#888", fontSize: 12 }}> RM/day</Text>
        </Text>
      </View>
    </View>
  </PostDetailContainer>
);

export const DescriptionSection = (props) => {
  dayjs.extend(relativeTime);

  return (
    <PostDetailContainer title="Description">
      <ExpandableText style={{ marginBottom: 25 }}>
        {props.description}
      </ExpandableText>
      <Text
        style={{ alignSelf: "flex-end", color: "#888", fontSize: 12 }}
      >{`Item posted ${dayjs(props.createdAt).fromNow()}`}</Text>
    </PostDetailContainer>
  );
};

import { useNavigation } from "@react-navigation/native";

const Category = (props) => {
  const navigation = useNavigation();

  return (
    <Text
      onPress={() => {
        store.dispatch({
          type: "SET_PARAMS",
          payload: { categories: [props.category] },
        });
        navigation.popToTop();
      }}
      style={{
        padding: 5,
        borderRadius: 2,
        backgroundColor: "#ddd", // "#fbb124"
        marginRight: 10,
        marginBottom: 5,
      }}
    >
      {props.category}
    </Text>
  );
};

const Categories = (props) =>
  props.categories.map((category, index) => (
    <Category category={category} key={index} />
  ));

export const CategoriesSection = (props) =>
  props.categories && props.categories.length ? (
    <PostDetailContainer title="Categories">
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Categories categories={props.categories} />
      </View>
    </PostDetailContainer>
  ) : null;

export const LocationSection = (props) => {
  const LocationData = (props) => (
    <View style={{ ...props.viewStyles }}>
      <Text style={{ color: "#888" }}>{props.title}</Text>
      <Text style={{ fontWeight: "bold", color: "#444" }}>{props.data}</Text>
    </View>
  );

  return (
    <PostDetailContainer title="Location">
      <LocationData
        viewStyles={{ marginBottom: 8 }}
        title="Address"
        data={props.address}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <LocationData
          viewStyles={{ width: "30%" }}
          title="Postcode"
          data={props.postcode}
        />
        <LocationData
          viewStyles={{ width: "30%" }}
          title="City"
          data={props.city}
        />
        <LocationData
          viewStyles={{ width: "30%" }}
          title="State"
          data={props.state}
        />
      </View>
    </PostDetailContainer>
  );
};

export const UserContactSection = (props) => {
  const { phoneNo, whatsappEnabled, facebook, instagram } = props.contact;

  return (
    <PostDetailContainer title="Owner Information">
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.replace("User", { handle: props.handle }); // replace
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                borderRadius: 40,
                overflow: "hidden",
                width: 60,
                height: 60,
              }}
            >
              <Image style={{ flex: 1 }} source={{ uri: props.image }} />
            </View>
            <Text style={{ fontWeight: "bold" }}>{props.handle}</Text>
          </View>
        </TouchableOpacity>
        <ChatButton
          Icon={MessageIcon}
          handle={props.handle}
          color="#fbb124"
          iconSize={32}
        />
        {phoneNo && (
          <ContactButton
            Icon={PhoneIcon}
            linkUrl={`tel:${phoneNo}`}
            color="#fbb124"
            iconSize={32}
            appName="Phone"
          />
        )}
        {whatsappEnabled && phoneNo && (
          <ContactButton
            Icon={WhatsappIcon}
            linkUrl={`whatsapp://send?phone=${phoneNo}`}
            color="#128c7e"
            iconSize={32}
            appName="Whatsapp"
          />
        )}
        {facebook && (
          <ContactButton
            Icon={FbIcon}
            linkUrl={`fb://facewebmodal/f?href=https://www.facebook.com/${facebook}`}
            color="#3b5998"
            iconSize={32}
            appName="Facebook"
          />
        )}
        {instagram && (
          <ContactButton
            Icon={IgIcon}
            linkUrl={`instagram://user?username=${instagram}`}
            color="#c32aa3"
            iconSize={32}
            appName="Instagram"
          />
        )}
      </View>
    </PostDetailContainer>
  );
};

export const PostNotFoundView = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FrownIcon size={80} style={{ color: "#888", marginBottom: 20 }} />
      <Text style={{ fontSize: 20, color: "#888", marginBottom: 20 }}>404</Text>
      <Text style={{ fontSize: 20, color: "#888", marginBottom: 40 }}>
        The post have been removed
      </Text>
      <Text
        style={{ fontSize: 20, color: "#fbb124" }}
        onPress={() => {
          let params = store.getState().data.params;
          store.dispatch({
            type: "SET_PARAMS",
            payload: { ...params, refresh: true }, // toggle it
          });
          navigation.popToTop();
        }}
      >
        Return
      </Text>
    </View>
  );
};
