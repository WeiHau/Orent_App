// Programmer Name     : Lim Wei Hau
// Program Name        : rental-requests.js
// Description         : The UI for pending rental requests page
// First Written on    : 30 January 2021
// Last Edited on      : 03 March 2021

import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  RefreshControl,
  ScrollView,
} from "react-native";

// redux
import { connect } from "react-redux";
import { getRentalRequests } from "../redux/actions/dataActions";

// components/util
import { FlatListContainer } from "../util/containers";
import { LendRequest, BorrowRequest } from "../components/rental-components";
import ScreenLoadingModal from "../util/ScreenLoadingModal";

export const Title = (props) => (
  <View style={{ marginBottom: 20 }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Roboto",
      }}
    >
      Pending Requests
    </Text>
    <Text
      style={{
        color: "#888",
        fontFamily: "sans-serif-light",
      }}
    >
      Pending rental requests...
    </Text>
  </View>
);

const Request = (props) => {
  const { amRenter } = props.item;

  return amRenter ? (
    <BorrowRequest item={props.item} />
  ) : (
    <LendRequest item={props.item} />
  );
};

const Requests = (props) => {
  let data = props.rentalRequests;

  if (!data || data.loading) return null;

  if (data.length === 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={data.loading}
            onRefresh={() => props.getRentalRequests()}
          />
        }
        style={{ margin: 50, flex: 1 }}
      >
        <Text style={{ fontSize: 16, color: "#888", alignSelf: "center" }}>
          No pending rental request
        </Text>
      </ScrollView>
    );
  }

  let temp2 = { renter: [], owner: [] };
  if (data && data.length > 0) {
    data.forEach((rentalRequest) => {
      if (rentalRequest.amRenter) {
        temp2.renter.push(rentalRequest);
      } else {
        temp2.owner.push(rentalRequest);
      }
    });
  }

  const temp = [];
  if (temp2.owner.length > 0) {
    temp.push({ title: "TO GIVE & RETRIEVE", data: temp2.owner });
  }
  if (temp2.renter.length > 0) {
    temp.push({ title: "TO GET & RETURN", data: temp2.renter });
  }

  const renderItem = ({ item }) => <Request item={item} />;

  return (
    <SectionList
      sections={data.loading ? [] : temp}
      contentContainerStyle={{
        paddingHorizontal: "3%",
      }}
      refreshControl={
        <RefreshControl
          refreshing={data.loading}
          onRefresh={() => props.getRentalRequests()}
        />
      }
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            height: 65,
            justifyContent: "center",
            padding: 10,
            borderRadius: 8,
            elevation: 3,
            borderWidth: 3,
            borderColor: "#fccf3f",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fbb128" }}>
            {title}
          </Text>
        </View>
      )}
      renderItem={renderItem}
      keyExtractor={(item) => item.requestId}
    />
  );
};

const requests = (props) => {
  useEffect(() => {
    props.getRentalRequests();
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
        <Title />
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
            props.navigation.navigate("Activities");
          }}
        >
          <Text style={{ color: "#fbb124", fontWeight: "bold" }}>APPROVED</Text>
        </TouchableOpacity>
      </View>
      <Requests
        rentalRequests={props.rentalRequests}
        getRentalRequests={props.getRentalRequests}
      />
      {props.rentalRequests.loading && <ScreenLoadingModal />}
    </FlatListContainer>
  );
};

const mapStateToProps = (state) => ({
  rentalRequests: state.data.rentalRequests,
});

const mapActionsToProps = {
  getRentalRequests,
};

export default connect(mapStateToProps, mapActionsToProps)(requests);
