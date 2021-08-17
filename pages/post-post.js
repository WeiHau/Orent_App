// Programmer Name     : Lim Wei Hau
// Program Name        : post-post.js
// Description         : The UI for view a post in detail page
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React, { useEffect, useRef, useState } from "react";
import { View, RefreshControl, Image, Text, Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

// redux & api endpoint calling
import { connect } from "react-redux";
import { getPost, sendRentalRequest } from "../redux/actions/dataActions";

// util/components
import {
  CategoriesSection,
  DescriptionSection,
  NamePriceSection,
  LocationSection,
  UserContactSection,
  PostNotFoundView,
} from "../components/post-components";
import {
  AnimatedHeaderContainer,
  PostDetailContainer,
} from "../util/containers";
import { MyButton2 } from "../util/my-form-elements";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Calendar } from "react-native-calendars";

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

const RentalSection = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  dayjs.extend(isBetween);

  if (!props.data.item) return null;

  const datePeriod = () => {
    if (!startDate || !endDate) return {};

    const returnVal = {};

    if (startDate == endDate) {
      returnVal[`${dayjs(startDate).format("YYYY-MM-DD")}`] = {
        selected: true,
        color: "#fbb124",
        startingDay: true,
        endingDay: true,
      };
    } else {
      returnVal[startDate] = {
        selected: true,
        color: "#fbb124",
        startingDay: true,
      };

      let iteratingDate = dayjs(startDate).add(1, "day").format("YYYY-MM-DD");
      while (dayjs(iteratingDate).isBetween(startDate, endDate, "day")) {
        returnVal[iteratingDate] = {
          selected: true,
          color: "#fbb124",
          // endingDay: true,
        };
        iteratingDate = dayjs(iteratingDate).add(1, "day").format("YYYY-MM-DD");
      }

      returnVal[endDate] = {
        selected: true,
        color: "#fbb124",
        endingDay: true,
      };
    }

    return returnVal;
  };

  let period = datePeriod();

  const sendRentalRequest = () => {
    if (!startDate || !endDate) {
      Alert.alert("No rental dates selected", "Please select the rental dates");
      return;
    }

    let reqObj = {
      handle: props.data.userHandle,
      postId: props.data.postId,
      startDate: startDate,
      endDate: endDate,
      totalCost:
        props.data.item.price * (dayjs(endDate).diff(startDate, "day") + 1),
    };

    Alert.alert("Send Rental Request", `Proceed to send rental request?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          props.sendRentalRequest(reqObj);
          Alert.alert(
            "Rental request sent",
            "Please check your rental request list"
          );
        },
      },
    ]);

    setStartDate(null);
    setEndDate(null);
  };

  return (
    <PostDetailContainer title="Request Rental">
      <View style={{ backgroundColor: "#fff", padding: 20 }}>
        <Calendar
          style={{ borderWidth: 5, borderColor: "#eee", borderRadius: 10 }}
          minDate={new Date()}
          hideExtraDays
          onDayPress={(day) => {
            if (!startDate) {
              setStartDate(day.dateString);
              setEndDate(day.dateString);
            } else if (
              startDate == endDate &&
              dayjs(day.dateString).isAfter(startDate)
            ) {
              setEndDate(day.dateString);
            } else {
              setStartDate(null);
              setEndDate(null);
            }
          }}
          markedDates={period}
          markingType={"period"}
        />
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 5,
              width: "100%",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginVertical: 5,
                  color: "#fbb128",
                }}
              >
                START DATE
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 5,
                  fontWeight: "bold",
                }}
              >
                {startDate}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginVertical: 5,
                  color: "#fbb128",
                }}
              >
                END DATE
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 5,
                  fontWeight: "bold",
                }}
              >
                {endDate}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 5,
              width: "100%",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginVertical: 5,
                  color: "#fbb128",
                }}
              >
                PRICE/DAY
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 5,
                  fontWeight: "bold",
                }}
              >
                {props.data.item.price}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginVertical: 5,
                  color: "#fbb128",
                }}
              >
                DAY(S)
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 5,
                  fontWeight: "bold",
                }}
              >
                {(dayjs(endDate).diff(startDate, "day") + 1) | 0}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginVertical: 5,
                  color: "#fbb128",
                }}
              >
                COST (RM)
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 5,
                  fontWeight: "bold",
                }}
              >
                {(props.data.item.price *
                  (dayjs(endDate).diff(startDate, "day") + 1)) |
                  0}
              </Text>
            </View>
          </View>
        </View>
        <MyButton2 onPress={sendRentalRequest} style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", color: "#fbb128" }}>REQUEST</Text>
        </MyButton2>
      </View>
    </PostDetailContainer>
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
      {props.showRentalSection && (
        <RentalSection
          data={data}
          sendRentalRequest={props.sendRentalRequest}
        />
      )}
    </View>
  );
};

const post = (props) => {
  let postId = useRef(props.route.params.postId);

  useEffect(() => {
    postId.current = props.route.params.postId;
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
      <Post
        post={props.post}
        sendRentalRequest={props.sendRentalRequest}
        showRentalSection={
          props.post && props.user.handle !== props.post.userHandle
        }
      />
    </AnimatedHeaderContainer>
  );
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  user: state.user.credentials,
});

const mapActionsToProps = {
  getPost,
  sendRentalRequest,
};

export default connect(mapStateToProps, mapActionsToProps)(post);
