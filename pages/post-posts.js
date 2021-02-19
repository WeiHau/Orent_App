import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";

// redux & api endpoint calling
import { connect } from "react-redux";
import { getPosts, setParams } from "../redux/actions/dataActions";

// util/component
import { HorizontalPost2 } from "../util/post-model";
import { ChevronDownIcon, SearchIcon } from "../util/icons";
import {
  FilterForm,
  ClearFilterButton,
  NoPostView,
} from "../components/posts-components";
import ScreenLoadingModal from "../util/ScreenLoadingModal";

const Posts = (props) => {
  let data = props.posts;

  if (data.length === 0) {
    return <NoPostView navigation={props.navigation} />;
  }

  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.navigate("Post", {
          postId: item.postId,
          name: item.item.name,
        });
      }}
      onLongPress={() => {
        console.log("long pressed");
      }}
    >
      <View>
        <HorizontalPost2 post={item} index={index} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList
      scrollEnabled={props.scrollEnabled}
      onScroll={props.onScroll}
      numColumns={2}
      contentContainerStyle={{
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: animatedTouchableHeight + 10,
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl
          refreshing={data.loading}
          progressViewOffset={animatedTouchableHeight + 10}
          onRefresh={() => props.getPosts()}
        />
      }
      data={data.loading ? [] : data}
      renderItem={renderItem}
      keyExtractor={(item) => item.postId}
    />
  );
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedChevron = Animated.createAnimatedComponent(ChevronDownIcon);
const animatedTouchableHeight = StatusBar.currentHeight + 60;
const filterFormHeight = (Dimensions.get("window").height * 8) / 10;

const posts = (props) => {
  useEffect(() => {
    if (props.params && props.params.refresh) {
      const { refresh, ...rest } = props.params;
      props.setParams(rest);
    } else {
      props.getPosts(props.params);
    }
  }, [props.params]);

  let scrollY = useRef(new Animated.Value(0)).current;
  //const scrollY = new Animated.Value(0);
  let diffClamp = useRef(
    Animated.diffClamp(scrollY, 0, animatedTouchableHeight)
  ).current;
  const translateY = diffClamp.interpolate({
    inputRange: [0, animatedTouchableHeight],
    outputRange: [0, -animatedTouchableHeight],
  });

  const [expanded, setExpanded] = useState(false);
  let scrollY2 = useRef(new Animated.Value(-filterFormHeight)).current;
  const spin = scrollY2.interpolate({
    inputRange: [-filterFormHeight, 0],
    outputRange: ["0deg", "180deg"],
  });
  const itemColor = !expanded ? "#888" : "#fbb124";

  const hideExpanded = (params = null) => {
    Animated.timing(scrollY2, {
      toValue: -filterFormHeight,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start(() => {
      setExpanded(false);
      if (params) props.setParams(params);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {!props.params || !Object.keys(props.params).length ? (
        <AnimatedTouchable
          style={{
            width: "100%",
            elevation: 4,
            justifyContent: "flex-end",
            zIndex: 10,
            position: "absolute",
            backgroundColor: "#fff",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            transform: [{ translateY: translateY }],
            alignItems: "center",
            height: animatedTouchableHeight,
          }}
          onPress={() => {
            if (expanded) hideExpanded();
            else setExpanded(true);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: itemColor, marginRight: 20 }}>SEARCH</Text>
            <SearchIcon style={{ color: itemColor }} />
          </View>
          <AnimatedChevron
            style={{ color: itemColor, transform: [{ rotate: spin }] }}
          />
        </AnimatedTouchable>
      ) : (
        <ClearFilterButton
          editFilter={() => {
            if (expanded) hideExpanded();
            else setExpanded(true);
          }}
          clearFilter={() => {
            props.setParams(null);
          }}
          height={animatedTouchableHeight}
        />
      )}
      <Posts
        scrollEnabled={!expanded}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        posts={props.posts}
        navigation={props.navigation}
        getPosts={() => {
          props.getPosts(props.params);
        }}
        animatedTouchableHeight={animatedTouchableHeight}
      />
      {expanded && (
        <Animated.View
          onLayout={() => {
            Animated.spring(scrollY2, {
              toValue: 0,
              tension: 2,
              friction: 8,
              useNativeDriver: true,
            }).start();
          }}
          style={{
            elevation: 2,
            width: "100%",
            transform: [{ translateY: scrollY2 }],
            position: "absolute",
          }}
        >
          <FilterForm
            animatedTouchableHeight={animatedTouchableHeight}
            filterFormHeight={filterFormHeight}
            hideExpanded={hideExpanded}
            filterParams={props.params}
          />
        </Animated.View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  posts: state.data.posts,
  params: state.data.params,
});

const mapActionsToProps = {
  getPosts,
  setParams,
};

export default connect(mapStateToProps, mapActionsToProps)(posts);
