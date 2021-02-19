import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";

// util/components
import { MyTextInput, MyButton2, MyPicker } from "../util/my-form-elements";
import { CategoriesSection } from "./mypost-components";

import {
  SearchIcon,
  ChevronUpIcon,
  XIcon,
  FrownIcon,
  EditIcon,
} from "../util/icons";

const PriceSection = (props) => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold" }}>$ Price</Text>
        <Text style={{ fontWeight: "bold" }}>(RM)</Text>
      </View>
      <MyTextInput
        placeholder="MIN"
        value={minPrice}
        onChangeText={(e) => setMinPrice(e)}
        viewStyle={{ width: "30%" }}
        keyboardType="numeric"
        style={{ textAlign: "center", width: "100%" }}
      />
      <Text style={{ marginBottom: 20, fontSize: 20, color: "#888" }}>
        {"< >"}
      </Text>
      <MyTextInput
        placeholder="MAX"
        value={maxPrice}
        onChangeText={(e) => setMaxPrice(e)}
        viewStyle={{ width: "30%" }}
        keyboardType="numeric"
        style={{ textAlign: "center", width: "100%" }}
      />
    </View>
  );
};

const LocationSection = (props) => {
  const {
    locationKeyword,
    locationType,
    setLocationKeyword,
    setLocationType,
  } = props;

  const textInputRef = useRef();

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <MyPicker
        viewStyle={{ width: "40%" }}
        selectedValue={locationType}
        setValue={setLocationType}
        options={["Address", "Postcode", "City", "State"]}
        onValueChange={(e) => {
          setLocationType(e);
          textInputRef.current.focus();
        }}
      />
      <MyTextInput
        placeholder={locationType}
        textInputRef={textInputRef}
        value={locationKeyword}
        onChangeText={(e) => setLocationKeyword(e)}
        viewStyle={{ width: "55%" }}
        keyboardType={locationType !== "Postcode" ? "default" : "numeric"}
      />
    </View>
  );
};

const isEmpty = (string) => {
  return string.trim() === "";
};

export const FilterForm = (props) => {
  let { filterParams } = props;
  // filterParams maybe null

  if (!filterParams) filterParams = {};

  const [keyword, setKeyword] = useState(filterParams.search || "");

  const [categories, setCategories] = useState(filterParams.categories || []);

  const [minPrice, setMinPrice] = useState(filterParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filterParams.maxPrice || "");

  const { address, postcode, city, state } = filterParams;
  const [locationKeyword, setLocationKeyword] = useState(
    address || postcode || city || state || ""
  );
  const [locationType, setLocationType] = useState(
    address
      ? "Address"
      : postcode
      ? "Postcode"
      : city
      ? "City"
      : state
      ? "State"
      : ""
  );

  const [hideOwnPosts, setHideOwnPosts] = useState(
    filterParams.hideOwnPosts || false
  );

  const onSubmit = () => {
    let params = {};

    if (!isEmpty(keyword)) params.search = keyword.trim();
    if (categories.length) params.categories = categories;
    if (!isEmpty(minPrice) && !isNaN(minPrice)) params.minPrice = minPrice;
    if (!isEmpty(maxPrice) && !isNaN(maxPrice)) params.maxPrice = maxPrice;

    if (!isEmpty(locationKeyword)) {
      switch (locationType) {
        case "Address":
          params.address = locationKeyword.trim();
          break;
        case "Postcode":
          params.postcode = locationKeyword.trim();
          break;
        case "City":
          params.city = locationKeyword.trim();
          break;
        case "State":
          params.state = locationKeyword.trim();
          break;
      }
    }

    if (hideOwnPosts) params.hideOwnPosts = true;

    props.hideExpanded(params);
  };

  // let panResponder = useRef(PanResponder.create({
  //         onStartShouldSetPanResponder: () => true,
  //         onPanResponderMove: (event, gestureState) => {
  //           console.log("sdf");
  //           console.log("asdflakj");
  //           translateValue.setValue(Math.max(0, 0 + gestureState.dy)); //step 1
  //         },
  //         onPanResponderRelease: (e, gesture) => {

  //           // const shouldOpen = gesture.vy <= 0;
  //           // Animated.spring(this.state.translateValue, {
  //           //   toValue: shouldOpen ? 0 : 200,
  //           //   velocity: gesture.vy,
  //           //   tension: 2,
  //           //   friction: 8,
  //           //   useNativeDriver: true,
  //           // }).start(); //step 2
  //         },
  //       })).current;

  return (
    <>
      <View
        style={{
          height: props.filterFormHeight,
          //position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          right: 0,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          overflow: "hidden",
          paddingTop: props.animatedTouchableHeight,
          backgroundColor: "#f2f2f2",
          justifyContent: "space-between",
          zIndex: 1,
          //paddingHorizontal: "5%",
        }}
      >
        <View style={{ paddingHorizontal: "5%" }}>
          <MyTextInput
            placeholder="KEYWORD"
            value={keyword}
            onChangeText={(e) => setKeyword(e)}
            Icon={SearchIcon}
          />
          <CategoriesSection
            categories={categories}
            setCategories={setCategories}
          />
          <PriceSection
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <LocationSection
            locationKeyword={locationKeyword}
            setLocationKeyword={setLocationKeyword}
            locationType={locationType}
            setLocationType={setLocationType}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text>Hide Own Posts</Text>
              <CheckBox
                value={hideOwnPosts}
                onValueChange={(e) => setHideOwnPosts(e)}
              />
            </View>
            <MyButton2 onPress={onSubmit}>
              <SearchIcon
                style={{ color: "#fbb124", width: 100, textAlign: "center" }}
              />
            </MyButton2>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#eee",
            width: "100%",
            alignItems: "center",
          }}
          onPress={() => {
            props.hideExpanded();
          }}
        >
          <ChevronUpIcon style={{ color: "#fbb124" }} />
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          props.hideExpanded();
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.3)",
            height: Dimensions.get("window").height,
          }}
        />
      </TouchableWithoutFeedback>
    </>
  );
};

export const ClearFilterButton = (props) => (
  <View
    style={{
      width: "100%",
      elevation: 4,
      alignItems: "flex-end",
      justifyContent: "space-evenly",
      zIndex: 10,
      position: "absolute",
      backgroundColor: "#fff",
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      height: props.height,
      paddingBottom: 15,
      paddingHorizontal: "5%",
      flexDirection: "row",
    }}
  >
    <TouchableOpacity
      onPress={props.editFilter}
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fbb124", marginRight: 10 }}>EDIT FILTER</Text>
      <EditIcon style={{ color: "#fbb124" }} />
    </TouchableOpacity>
    <View style={{ borderWidth: 0.5, height: 24, borderColor: "#888" }} />
    <TouchableOpacity
      onPress={props.clearFilter}
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#f45c57", marginRight: 10 }}>CLEAR FILTER</Text>
      <XIcon style={{ color: "#f45c57" }} />
    </TouchableOpacity>
  </View>
);

export const NoPostView = (props) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <FrownIcon size={80} style={{ color: "#888", marginBottom: 20 }} />
    <Text style={{ fontSize: 20, color: "#888", marginBottom: 50 }}>
      No post yet
    </Text>
    <Text
      style={{ fontSize: 20, color: "#fbb124" }}
      onPress={() => {
        props.navigation.navigate("App", {
          screen: "Home",
          params: {
            screen: "My Posts",
            params: {
              screen: "AddPost",
            },
          },
        });
      }}
    >
      Add a Post!
    </Text>
  </View>
);

// App > Home > My Posts > AddPost
// navigation.navigate('Root', {
//   screen: 'Settings',
//   params: {
//     screen: 'Sound',
//     params: {
//       screen: 'Media',
//     },
//   },
// });

//
//   constructor(props) {
//     super(props);
//     this.panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (event, gestureState) => {
//         console.log("sdf");
//         console.log("asdflakj");
//         this.state.translateValue.setValue(Math.max(0, 0 + gestureState.dy)); //step 1
//       },
//       onPanResponderRelease: (e, gesture) => {
//         const shouldOpen = gesture.vy <= 0;
//         Animated.spring(this.state.translateValue, {
//           toValue: shouldOpen ? 0 : 200,
//           velocity: gesture.vy,
//           tension: 2,
//           friction: 8,
//           useNativeDriver: true,
//         }).start(); //step 2
//       },
//     });
//   }
