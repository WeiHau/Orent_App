import React, { useEffect, useRef } from "react";
import {
  RefreshControl,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

// redux & api endpoint calling
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

// util/components
import { HorizontalPost2 } from "../util/post-model";
import { AnimatedHeaderContainer, FlatListContainer } from "../util/containers";
import { ExpandableText } from "../util/my-form-elements";
import {
  LocationSection,
  ContactsSection,
} from "../components/profile-component";

import { useNavigation } from "@react-navigation/native";

import dayjs from "dayjs";

import { ItemIcon } from "../util/icons";

const UserData = (props) => {
  const { userData, postNo, posts } = props;
  const navigation = useNavigation();

  if (!userData) return null;

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.push("Post", {
          // replace or push??
          postId: item.postId,
          name: item.item.name,
        });
      }}
      onLongPress={() => {
        console.log("long pressed");
      }}
    >
      <View>
        <HorizontalPost2
          post={item}
          width={(Dimensions.get("window").width * 40) / 100}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  const {
    handle,
    imageUrl,
    fullName,
    bio,
    createdAt,
    location: { address, postcode, city, state },
    contact: { email, facebook, whatsappEnabled, instagram, phoneNo },
  } = userData;

  return (
    <FlatListContainer style={{ backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <View
          style={{
            width: 130,
            height: 130,
            overflow: "hidden",
            borderRadius: 300,
            borderWidth: 4,
            borderColor: "#fbb124",
            elevation: 10,
            marginBottom: 5,
          }}
        >
          <Image style={{ flex: 1 }} source={{ uri: imageUrl }} />
        </View>
        <Text style={{ color: "#888", marginBottom: 5 }}>{`@${handle}`}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 20 }}>
          {fullName}
        </Text>
      </View>
      <ExpandableText
        style={{
          alignSelf: "flex-start",
          width: "100%",
          marginHorizontal: 20,
          marginBottom: 20,
        }}
      >
        {bio}
      </ExpandableText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginBottom: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fbb124" }}>POSTS</Text>
          <Text style={{ color: "#444" }}>{postNo}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fbb124" }}>MEMBER SINCE</Text>
          <Text style={{ color: "#444" }}>
            {dayjs(createdAt).format("MMM YYYY")}
          </Text>
        </View>
      </View>
      <LocationSection
        address={address}
        postcode={postcode}
        city={city}
        state={state}
        backgroundColor="#fff"
      />
      <ContactsSection
        phoneNo={phoneNo}
        waEnabled={whatsappEnabled}
        fb={facebook}
        ig={instagram}
        handle={handle}
        backgroundColor="#fff"
      />
      <View
        style={{
          width: "100%",
          borderColor: "#aaa",
          borderTopWidth: 1,
        }}
      />
      <View
        style={{
          backgroundColor: "#fff",
          alignSelf: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 8,
          height: 30,
          position: "relative",
          //marginBottom: 10,
          top: -15,
        }}
      >
        <ItemIcon size={16} color="#666" style={{ paddingRight: 8 }} />
        <Text style={{ color: "#666", fontSize: 16 }}>Posts</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 8, marginBottom: 10 }}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.postId}
        horizontal
      />
    </FlatListContainer>
  );
};

const user = (props) => {
  let handle = useRef(props.route.params.handle);

  useEffect(() => {
    props.getUserData(handle.current);
  }, [props.route.params.handle]);

  // switch user (trigger reload)
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // Screen was focused
      if (props.userData.changeUser)
        props.getUserData(props.userData.changeUser);
    });

    return unsubscribe;
  }, [props.navigation, props.userData]);

  return (
    <AnimatedHeaderContainer
      navigation={props.navigation}
      title={`@${props.route.params.handle}`}
      refreshControl={
        <RefreshControl
          progressViewOffset={90}
          refreshing={props.userData.loading}
          onRefresh={() => props.getUserData(handle.current)}
        />
      }
    >
      <UserData
        userData={props.userData.user}
        posts={props.userData.posts}
        postNo={props.userData.posts ? props.userData.posts.length : 0}
        navigation={props.navigation}
      />
    </AnimatedHeaderContainer>
  );

  // return (
  //   <AnimatedHeaderContainer
  //     navigation={props.navigation}
  //     title={`@${props.route.params.handle}`}
  //     refreshControl={
  //       <RefreshControl
  //         progressViewOffset={90}
  //         refreshing={props.userData.loading}
  //         onRefresh={() => props.getUserData(handle.current)}
  //       />
  //     }
  //     ListHeaderComponent={
  //       <UserData
  //         userData={props.userData.user}
  //         postNo={props.userData.posts ? props.userData.posts.length : 0}
  //         navigation={props.navigation}
  //       />
  //     }
  //     data={props.userData.loading ? [] : props.userData.posts}
  //     renderItem={renderItem}
  //     keyExtractor={(item) => item.postId}
  //     contentContainerStyle={{
  //       paddingHorizontal: "3%",
  //       backgroundColor: "#fff",
  //     }}
  //     flatlist // TODO: remove the flatlist, contain the flatlist with a scrollview and do the job OR use horizontal again
  //   />
  // );
};

const mapStateToProps = (state) => ({
  userData: state.data.userData,
});

const mapActionsToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapActionsToProps)(user);
