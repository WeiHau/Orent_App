// Programmer Name     : Lim Wei Hau
// Program Name        : post-model.js
// Description         : util - all often used UI components on displaying posts
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  Switch,
  Animated,
  Dimensions,
} from "react-native";

import dayjs from "dayjs";

import { TagsIcon, LocationIcon2 } from "../util/icons";

const UnavailableModal = (props) => {
  const slideAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.spring(slideAnim, {
        toValue: 200,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.4)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <Text style={{ color: "#fff" }}>UNAVAILABLE</Text>
    </Animated.View>
  );
};

export const HorizontalPost = (props) => {
  // take createdAt, isAvailable, item (categories, desc, img, name, price), postId

  const {
    post: {
      createdAt,
      isAvailable,
      item: { categories, description, image, name, price },
      postId,
    },
  } = props;

  return (
    <View
      style={{
        backgroundColor: "#fff",
        elevation: 2,
        width: "100%",
        height: 140,
        borderRadius: 4,
        overflow: "hidden",
        marginBottom: 15,
      }}
    >
      {!isAvailable && <UnavailableModal />}
      <Switch
        value={isAvailable}
        trackColor={{ true: "#fccf3f" }}
        thumbColor={isAvailable ? "#fbb124" : "#ccc"}
        style={{ elevation: 1, position: "absolute", right: 8, top: 8 }}
        onValueChange={() => {
          if (isAvailable) props.disablePost(postId);
          else props.enablePost(postId);
        }}
      />
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={{ width: "40%", resizeMode: "cover" }}
        source={{
          uri: image,
        }}
      >
        <View
          style={{
            marginLeft: "40%",
            flex: 1,
            padding: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontWeight: "bold",
                fontSize: 18,
                paddingRight: 8,
                borderColor: "#888",
                color: "#222",
              }}
            >
              {name}
            </Text>
          </View>
          <Text
            style={{
              color: "#888",
              fontSize: 12,
              marginBottom: 8,
            }}
            numberOfLines={2}
          >
            {description}
          </Text>
          {categories && !!categories.length && (
            <View
              style={{
                //flex: 1,
                flexDirection: "row",
                alignItems: "center",
                paddingRight: 8,
              }}
            >
              <TagsIcon size={12} style={{ color: "#888", marginRight: 2 }} />
              <Text
                numberOfLines={1}
                style={{
                  color: "#888",
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                {categories.join(", ")}
              </Text>
            </View>
          )}

          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#888",
                fontSize: 10,
              }}
            >
              {dayjs(createdAt).format("DD/MM/YY")}
            </Text>
            <Text style={{ paddingLeft: 8 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>{price}</Text>
              <Text style={{ color: "#888", fontSize: 12 }}> RM/day</Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export const HorizontalPost2 = (props) => {
  // take createdAt, isAvailable, item (categories, desc, img, name, price), postId

  const {
    post: {
      createdAt,
      item: { categories, description, image, name, price },
      location: { address, postcode, city, state },
      postId,
    },
  } = props;

  return (
    <View
      style={{
        width: !props.width
          ? (Dimensions.get("window").width * 47) / 100
          : props.width, //45
        marginLeft: 3.5,
        marginRight: 3.5,
        backgroundColor: "#fff",
        marginBottom: 10,
        elevation: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <ImageBackground
        source={{ uri: image }}
        style={{ width: "100%", aspectRatio: 1, justifyContent: "flex-end" }}
      >
        <Text
          style={{
            paddingHorizontal: 5,
            alignSelf: "flex-end",
            backgroundColor: "rgba(255,255,255, .7)",
          }}
          numberOfLines={1}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{price}</Text>
          <Text style={{ color: "#555", fontSize: 10 }}> RM/day</Text>
        </Text>
      </ImageBackground>
      <View
        style={{
          paddingHorizontal: 6,
          paddingVertical: 4,
          height: 65,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Text style={{}} numberOfLines={2}>
          {name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <LocationIcon2 size={10} style={{ color: "#888" }} />
          <Text
            style={{ fontSize: 10, color: "#888", textAlign: "right" }}
          >{`${postcode}, ${city}`}</Text>
        </View>
      </View>
    </View>
  );
};
