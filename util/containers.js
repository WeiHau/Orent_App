import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
export const ScreenContainer = (props) => (
  <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    refreshControl={props.refreshControl}
    style={{ flexGrow: 1, marginTop: STATUSBAR_HEIGHT, ...props.style }}
  >
    <View
      style={{
        flex: 1,
        padding: "5%",
      }}
    >
      {props.children}
    </View>
  </ScrollView>
);

export const FlatListContainer = (props) => (
  <View
    style={{
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
      ...props.style,
    }}
  >
    {props.children}
  </View>
);

export const FormSection = (props) => {
  let { Icon } = props;

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          backgroundColor: "#fbb124",
          height: 50,
          alignItems: "center",
          paddingLeft: 3,
          paddingBottom: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 5,
          flexDirection: "row",
          overflow: "visible",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            height: 50,
            width: "101%",
            borderWidth: 1,
            borderColor: "#fbb124",
            alignItems: "center",
            paddingLeft: 25,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 5,
            flexDirection: "row",
          }}
        >
          {!!Icon && <Icon style={{ paddingRight: 10 }} color="#fbb124" />}
          <Text style={{ color: "#fbb124", fontWeight: "bold" }}>
            {props.title}
          </Text>
        </View>
      </View>
      <View style={{ padding: "3%" }}>{props.children}</View>
    </View>
  );
};

export const ProfileSection = (props) => {
  const { Icon } = props;

  return (
    <View
      style={{
        marginVertical: 20,
        width: "100%",
        borderColor: "#aaa",
        borderTopWidth: 1,
        padding: "6%",
      }}
    >
      <View
        style={{
          backgroundColor: props.backgroundColor,
          alignSelf: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 8,
          height: 30,
          position: "absolute",
          top: -15,
        }}
      >
        {Icon && <Icon size={16} color="#666" style={{ paddingRight: 8 }} />}
        <Text style={{ color: "#666", fontSize: 16 }}>{props.title}</Text>
      </View>
      {props.children}
    </View>
  );
};

export const PostDetailContainer = (props) => (
  <View
    style={{
      padding: 15,
      backgroundColor: "#fff",
      marginBottom: 10,
      elevation: 1,
    }}
  >
    {props.title && (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        {props.icon}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{props.title}</Text>
      </View>
    )}
    {props.children}
  </View>
);

// need navigation, title, children, refreshcontrol
import { BackIcon2 } from "../util/icons";
export const AnimatedHeaderContainer = (props) => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const AnimatedBackIcon2 = Animated.createAnimatedComponent(BackIcon2);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;

    if (scrollPosition < Dimensions.get("window").width + 100) {
      Animated.timing(animationValue, {
        toValue: scrollPosition,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const { navigation } = props;
  const { title } = props;
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          padding: 15,
          paddingTop: STATUSBAR_HEIGHT + 15,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: animationValue.interpolate({
            inputRange: [0, Dimensions.get("window").width],
            outputRange: ["rgba(255,255,255, 0)", "rgba(255,255,255, 1)"],
          }),
          marginBottom: 40,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Animated.View
            style={{
              backgroundColor: animationValue.interpolate({
                inputRange: [0, Dimensions.get("window").width],
                outputRange: ["rgba(0,0,0,0.2)", "rgba(0,0,0,0)"],
              }),
              padding: 5,
              marginRight: 15,
              borderRadius: 25,
            }}
          >
            <AnimatedBackIcon2
              size={24}
              style={{
                color: animationValue.interpolate({
                  inputRange: [0, Dimensions.get("window").width],
                  outputRange: ["#ffffff", "#fbb124"],
                }),
              }}
            />
          </Animated.View>
        </TouchableOpacity>
        <Animated.Text
          style={{
            fontSize: 20,
            flex: 1,
            color: animationValue.interpolate({
              inputRange: [0, Dimensions.get("window").width],
              outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,1)"],
            }),
          }}
          numberOfLines={1}
        >
          {title}
        </Animated.Text>
      </Animated.View>
      {!props.flatlist ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flexGrow: 1 }}
          refreshControl={props.refreshControl}
          onScroll={handleScroll}
        >
          {props.children}
        </ScrollView>
      ) : (
        <FlatList onScroll={handleScroll} {...props} />
      )}
    </View>
  );
};
