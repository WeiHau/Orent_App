// Programmer Name     : Lim Wei Hau
// Program Name        : mypost-home.js
// Description         : The UI for myposts page
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
} from "react-native";

// redux
import { connect } from "react-redux";
import {
  getMyPosts,
  enablePost,
  disablePost,
} from "../redux/actions/dataActions";

// components/util
import { FlatListContainer } from "../util/containers";
import { HorizontalPost } from "../util/post-model";
import { MyPostTitle } from "../components/mypost-components";

// icons
import { PlusIcon } from "../util/icons";

const MyPosts = (props) => {
  let data = props.myPosts;

  if (!data || data.length === 0) {
    return (
      <View style={{ margin: 50, flex: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#888" }}>No post yet...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onLongPress={() => {
        props.navigation.navigate("EditPost", { post: item });
      }}
    >
      <View>
        <HorizontalPost
          post={item}
          enablePost={props.enablePost}
          disablePost={props.disablePost}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: "3%",
      }}
      refreshControl={
        <RefreshControl
          refreshing={data.loading}
          onRefresh={() => props.getMyPosts()}
        />
      }
      data={data.loading ? [] : data}
      renderItem={renderItem}
      keyExtractor={(item) => item.postId}
    />
  );
};

const home = (props) => {
  useEffect(() => {
    props.getMyPosts();
  }, []);

  return (
    <FlatListContainer>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
        }}
      >
        <MyPostTitle />
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
            props.navigation.navigate("AddPost");
          }}
        >
          <PlusIcon size={20} style={{ color: "#fbb124", marginRight: 5 }} />
          <Text style={{ color: "#fbb124", fontWeight: "bold" }}>NEW POST</Text>
        </TouchableOpacity>
      </View>
      <MyPosts
        navigation={props.navigation}
        myPosts={props.myPosts}
        getMyPosts={props.getMyPosts}
        enablePost={props.enablePost}
        disablePost={props.disablePost}
      />
    </FlatListContainer>
  );
};

const mapStateToProps = (state) => ({
  myPosts: state.data.myPosts,
});

const mapActionsToProps = {
  getMyPosts,
  enablePost,
  disablePost,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
