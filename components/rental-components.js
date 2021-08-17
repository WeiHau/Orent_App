// Programmer Name     : Lim Wei Hau
// Program Name        : rental-components.js
// Description         : The UI components for page 'rental-activities.js' and 'rental-requests.js'
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";

// redux
import { connect } from "react-redux";
import { approveRentalRequest } from "../redux/actions/dataActions";

// components/util
import { TrashIcon } from "../util/icons";
import { MyButton3 } from "../util/my-form-elements";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { useNavigation } from "@react-navigation/native";

const LendRequestView = (props) => {
  const {
    amRenter,
    createdAt,
    endDate,
    post: { image, postId, title },
    requestId,
    startDate,
    totalCost,
    user: { fullName, handle, imageUri },
  } = props.item;

  const navigation = useNavigation();

  const approveRequest = () => {
    Alert.alert(
      "Approve Request",
      `Approve the rental request from ${fullName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => props.approveRentalRequest(requestId, true),
        },
      ]
    );
  };

  const rejectRequest = () => {
    Alert.alert(
      "Reject Request",
      `Reject the rental request from ${fullName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => props.approveRentalRequest(requestId, false),
        },
      ]
    );
  };

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        elevation: 3,
        marginHorizontal: 5,
      }}
    >
      <View style={{ marginBottom: 15, alignSelf: "center" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {fullName}
        </Text>
        <Text
          style={{ fontSize: 12, color: "#888", alignSelf: "center" }}
        >{`@${handle}`}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 15,
          borderBottomWidth: 0.5,
        }}
      >
        <View style={{ alignItems: "center", flex: 1.5 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("App", {
                screen: "Home",
                params: {
                  screen: "Home",
                  params: {
                    screen: "User",
                    params: { handle },
                  },
                },
              });
            }}
          >
            <View
              style={{
                borderRadius: 100,
                overflow: "hidden",
                elevation: 2,
                borderWidth: 4,
                borderColor: "#fbb124",
              }}
            >
              <Image
                source={{ uri: imageUri }}
                style={{ width: 150, height: 150 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>START</Text>
            <Text
              style={{
                color: dayjs().isBefore(startDate, "day") ? "#444" : "red",
                fontWeight: "bold",
              }}
            >
              {startDate}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>RETURN</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>{endDate}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>EARN (RM)</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>
              {totalCost}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <View style={{ alignItems: "center", flex: 1, maxWidth: "33%" }}>
          <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Your Item</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("App", {
                screen: "Home",
                params: {
                  screen: "Home",
                  params: {
                    screen: "Post",
                    params: { postId },
                  },
                },
              });
            }}
          >
            <View
              style={{ borderRadius: 10, overflow: "hidden", elevation: 3 }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 75, height: 75 }}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text numberOfLines={1} style={{}}>
            {title}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flex: 1,
            maxWidth: "33%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>REQUESTED ON</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>
              {dayjs(createdAt).format("YYYY-MM-DD")}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>STATUS</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>
              {"pending..."}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-around",
            maxWidth: "33%",
            flex: 1,
          }}
        >
          <MyButton3
            positive
            onPress={approveRequest}
            style={{ alignSelf: "center" }}
          >
            <Text style={{ color: "#fff", marginHorizontal: 5 }}>APPROVE</Text>
          </MyButton3>
          <MyButton3 onPress={rejectRequest} style={{ alignSelf: "center" }}>
            <Text style={{ color: "#fff", marginHorizontal: 13 }}>REJECT</Text>
          </MyButton3>
        </View>
      </View>
    </View>
  );
};

export const LendRequest = connect(null, { approveRentalRequest })(
  LendRequestView
);

const BorrowRequestView = (props) => {
  const {
    amRenter,
    createdAt,
    endDate,
    post: { image, postId, title },
    requestId,
    startDate,
    totalCost,
    user: { fullName, handle, imageUri },
  } = props.item;

  const cancelRequest = () => {
    Alert.alert("Cancel Request", "Delete the rental request?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => props.approveRentalRequest(requestId, false),
      },
    ]);
  };

  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        elevation: 3,
        marginHorizontal: 5,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 15,
          fontSize: 18,
          marginLeft: 5,
          alignSelf: "center",
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 15,
          borderBottomWidth: 0.5,
        }}
      >
        <View style={{ alignItems: "center", flex: 1.5 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("App", {
                screen: "Home",
                params: {
                  screen: "Home",
                  params: {
                    screen: "Post",
                    params: { postId },
                  },
                },
              });
            }}
          >
            <View
              style={{ borderRadius: 10, overflow: "hidden", elevation: 3 }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>START</Text>
            <Text
              style={{
                color: dayjs().isBefore(startDate, "day") ? "#444" : "red",
                fontWeight: "bold",
              }}
            >
              {startDate}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>RETURN</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>{endDate}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>COST (RM)</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>
              {totalCost}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Owner</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("App", {
                  screen: "Home",
                  params: {
                    screen: "Home",
                    params: {
                      screen: "User",
                      params: { handle },
                    },
                  },
                });
              }}
            >
              <View
                style={{
                  borderRadius: 50,
                  overflow: "hidden",
                  elevation: 2,
                  borderWidth: 2,
                  borderColor: "#fbb124",
                }}
              >
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 75, height: 75 }}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={{}}>{fullName}</Text>
            <Text style={{ fontSize: 12, color: "#888" }}>{`@${handle}`}</Text>
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#fbb124" }}>REQUESTED ON</Text>
              <Text style={{ color: "#444", fontWeight: "bold" }}>
                {dayjs(createdAt).format("YYYY-MM-DD")}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#fbb124" }}>STATUS</Text>
              <Text style={{ color: "#444", fontWeight: "bold" }}>
                {"pending..."}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <MyButton3
              onPress={cancelRequest}
              style={{ alignSelf: "center", marginBottom: 10 }}
            >
              <TrashIcon
                style={{
                  color: "#fff",
                  marginVertical: 5,
                  marginHorizontal: 15,
                }}
              />
            </MyButton3>
          </View>
        </View>
      </View>
    </View>
  );
};

export const BorrowRequest = connect(null, { approveRentalRequest })(
  BorrowRequestView
);

// ACTIVITIES
export const LendActivity = (props) => {
  const {
    amRenter,
    createdAt,
    endDate,
    post: { image, postId, title },
    requestId,
    startDate,
    totalCost,
    user: { fullName, handle, imageUri },
  } = props.item;

  dayjs.extend(isBetween);

  const onGoing = dayjs().isBetween(startDate, endDate, "day", "[]");
  const allDone = dayjs().isAfter(endDate, "day");

  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        elevation: 3,
        marginHorizontal: 5,
      }}
    >
      <View style={{ marginBottom: 15, alignSelf: "center" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {fullName}
        </Text>
        <Text
          style={{ fontSize: 12, color: "#888", alignSelf: "center" }}
        >{`@${handle}`}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 15,
          borderBottomWidth: 0.5,
        }}
      >
        <View style={{ alignItems: "center", flex: 1.5 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("App", {
                screen: "Home",
                params: {
                  screen: "Home",
                  params: {
                    screen: "User",
                    params: { handle },
                  },
                },
              });
            }}
          >
            <View
              style={{
                borderRadius: 100,
                overflow: "hidden",
                elevation: 2,
                borderWidth: 4,
                borderColor: "#fbb124",
              }}
            >
              <Image
                source={{ uri: imageUri }}
                style={{ width: 150, height: 150 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>START</Text>
            <Text
              style={{
                color: "#444",
                fontWeight: "bold",
              }}
            >
              {startDate}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>RETURN</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>{endDate}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>EARN (RM)</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>
              {totalCost}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <View style={{ alignItems: "center", flex: 1, maxWidth: "50%" }}>
          <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Your Item</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("App", {
                screen: "Home",
                params: {
                  screen: "Home",
                  params: {
                    screen: "Post",
                    params: { postId },
                  },
                },
              });
            }}
          >
            <View
              style={{ borderRadius: 10, overflow: "hidden", elevation: 3 }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 75, height: 75 }}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text numberOfLines={1} style={{}}>
            {title}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flex: 1,
            maxWidth: "50%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>REQUESTED ON</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>
              {dayjs(createdAt).format("YYYY-MM-DD")}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>STATUS</Text>
            <Text
              style={{
                color: onGoing ? "#d8b863" : allDone ? "green" : "#3eb489",
                fontWeight: "bold",
              }}
            >
              {onGoing ? "On Going" : allDone ? "Completed" : "Approved"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const BorrowActivity = (props) => {
  const {
    amRenter,
    createdAt,
    endDate,
    post: { image, postId, title },
    requestId,
    startDate,
    totalCost,
    user: { fullName, handle, imageUri },
  } = props.item;

  dayjs.extend(isBetween);
  const onGoing = dayjs().isBetween(startDate, endDate, "day", "[]");
  const allDone = dayjs().isAfter(endDate, "day");

  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        elevation: 3,
        marginHorizontal: 5,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 15,
          fontSize: 18,
          marginLeft: 5,
          alignSelf: "center",
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 15,
          borderBottomWidth: 0.5,
        }}
      >
        <View style={{ alignItems: "center", flex: 1.5 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("App", {
                screen: "Home",
                params: {
                  screen: "Home",
                  params: {
                    screen: "Post",
                    params: { postId },
                  },
                },
              });
            }}
          >
            <View
              style={{ borderRadius: 10, overflow: "hidden", elevation: 3 }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>START</Text>
            <Text
              style={{
                color: "#444",
                fontWeight: "bold",
              }}
            >
              {startDate}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>RETURN</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>{endDate}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fbb124" }}>COST (RM)</Text>
            <Text style={{ color: "#444", fontWeight: "bold" }}>
              {totalCost}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Owner</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("App", {
                  screen: "Home",
                  params: {
                    screen: "Home",
                    params: {
                      screen: "User",
                      params: { handle },
                    },
                  },
                });
              }}
            >
              <View
                style={{
                  borderRadius: 50,
                  overflow: "hidden",
                  elevation: 2,
                  borderWidth: 2,
                  borderColor: "#fbb124",
                }}
              >
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 75, height: 75 }}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={{}}>{fullName}</Text>
            <Text style={{ fontSize: 12, color: "#888" }}>{`@${handle}`}</Text>
          </View>
          <View
            style={{ justifyContent: "space-evenly", alignItems: "center" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#fbb124" }}>REQUESTED ON</Text>
              <Text style={{ color: "#444", fontWeight: "bold" }}>
                {dayjs(createdAt).format("YYYY-MM-DD")}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#fbb124" }}>STATUS</Text>
              <Text
                style={{
                  color: onGoing ? "#d8b863" : allDone ? "green" : "#3eb489",
                  fontWeight: "bold",
                }}
              >
                {onGoing ? "On Going" : allDone ? "Completed" : "Approved"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
