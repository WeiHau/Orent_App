// Programmer Name     : Lim Wei Hau
// Program Name        : mypost-components.js
// Description         : The UI components for page 'mypost-addpost.js' and 'mypost-editpost.js'
// First Written on    : 30 December 2020
// Last Edited on      : 03 March 2021

import React, { useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";

import { categoryArray } from "../util/constants";

// icons
import { TagsIcon } from "../util/icons";

export const MyPostTitle = (props) => (
  <View style={{ marginBottom: 20 }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Roboto",
      }}
    >
      My Posts
    </Text>
    <Text
      style={{
        color: "#888",
        fontFamily: "sans-serif-light",
      }}
    >
      To edit, press & hold the post.
    </Text>
  </View>
);

export const AddPostTitle = (props) => (
  <View style={{ marginBottom: 20 }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Roboto",
      }}
    >
      Add a new post
    </Text>
    <Text
      style={{
        color: "#888",
        fontFamily: "sans-serif-light",
      }}
    >
      Please complete the info below
    </Text>
  </View>
);

export const EditPostTitle = (props) => (
  <View style={{ marginBottom: 20 }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Roboto",
      }}
    >
      Edit post
    </Text>
    <Text
      style={{
        color: "#888",
        fontFamily: "sans-serif-light",
      }}
    >
      Edit any criteria below
    </Text>
  </View>
);

export const ItemImage = (props) => {
  const { error, imageUri, pickImage } = props;

  return (
    <View style={{ width: "60%" }}>
      <View
        style={{
          width: "100%",
          aspectRatio: 1,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: error ? "#f45c57" : "#aaa",
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
              : "https://firebasestorage.googleapis.com/v0/b/apu-fyp-3cfd9.appspot.com/o/no-img2.png?alt=media",
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
            <Text style={{ color: "white" }}>UPLOAD ITEM IMAGE</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      {error ? (
        <Text
          numberOfLines={1}
          style={{
            color: "#c00",
            //textAlign: "center",
          }}
        >
          {error}
        </Text>
      ) : (
        <Text numberOfLines={1} style={{ color: "transparent" }}>
          Some Text
        </Text>
      )}
    </View>
  );
};

const Category = (props) => {
  const { category, categories, setCategories } = props;
  const selected = useRef(categories.includes(category));

  return (
    <Text
      onPress={() => {
        if (selected.current) {
          // remove from categories state
          setCategories(categories.filter((data) => data !== category));
          selected.current = false;
        } else {
          if (categories.length > 2) {
            Alert.alert(
              "Max no. of categories selected",
              "Please select only 3 categories at most",
              [{ text: "OK" }],
              { cancelable: false }
            );
          } else {
            // add into categories state
            setCategories([...categories, category]);
            selected.current = true;
          }
        }
      }}
      style={{
        padding: 5,
        borderRadius: 2,
        backgroundColor: selected.current ? "#fbb124" : "#ccc",
        margin: 5,
      }}
    >
      {category}
    </Text>
  );
};

const Categories = (props) => {
  const { categories, setCategories } = props;

  return categoryArray.map((category, index) => (
    <Category
      category={category}
      categories={categories}
      setCategories={setCategories}
      key={index}
    />
  ));
};

export const CategoriesSection = (props) => {
  const { categories, setCategories } = props;

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TagsIcon style={{ marginHorizontal: 5 }} />
        <Text style={{ fontWeight: "bold" }}>Categories</Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Categories categories={categories} setCategories={setCategories} />
      </View>
    </View>
  );
};
