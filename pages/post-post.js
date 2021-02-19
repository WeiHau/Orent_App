import React, { useEffect, useRef } from "react";
import { View, RefreshControl, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

// redux & api endpoint calling
import { connect } from "react-redux";
import { getPost } from "../redux/actions/dataActions";

// util/components
import {
  CategoriesSection,
  DescriptionSection,
  NamePriceSection,
  LocationSection,
  UserContactSection,
  PostNotFoundView,
} from "../components/post-components";
import { AnimatedHeaderContainer } from "../util/containers";

const ItemSection = (props) => {
  const { item } = props;

  if (!item) return null;

  return (
    <View>
      <Image
        source={{ uri: item.image }}
        style={{
          width: "100%",
          resizeMode: "cover",
          aspectRatio: 1,
        }}
      />
      <NamePriceSection name={item.name} price={item.price} />
      <DescriptionSection
        description={item.description}
        createdAt={props.createdAt}
      />
      <CategoriesSection categories={item.categories} />
    </View>
  );
};

const UserSection = (props) => {
  const { user } = props;
  const navigation = useNavigation();

  if (!user.location) return null;

  const { location } = user;

  return (
    <View>
      <LocationSection
        address={location.address}
        postcode={location.postcode}
        city={location.city}
        state={location.state}
      />
      <UserContactSection
        handle={user.handle}
        image={user.image}
        contact={user.contact}
        navigation={navigation}
      />
    </View>
  );
};

const Post = (props) => {
  const data = props.post;

  // data.isAvailable data.createdAt

  if (data.error && data.error === "Post not found") {
    return <PostNotFoundView />;
  }

  return (
    <View>
      <ItemSection item={data.item} createdAt={data.createdAt} />
      <UserSection
        user={{
          handle: data.userHandle,
          image: data.userImage,
          location: data.location,
          contact: data.userContact,
        }}
      />
    </View>
  );
};

const post = (props) => {
  let postId = useRef(props.route.params.postId);

  useEffect(() => {
    props.getPost(postId.current);
  }, [props.route.params.postId]);

  return (
    <AnimatedHeaderContainer
      navigation={props.navigation}
      title={props.route.params.name}
      refreshControl={
        <RefreshControl
          progressViewOffset={90}
          refreshing={props.post.loading}
          onRefresh={() => props.getPost(postId.current)}
        />
      }
    >
      <Post post={props.post} />
    </AnimatedHeaderContainer>
  );
};

const mapStateToProps = (state) => ({
  post: state.data.post,
});

const mapActionsToProps = {
  getPost,
};

export default connect(mapStateToProps, mapActionsToProps)(post);
