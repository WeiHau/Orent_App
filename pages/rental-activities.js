// Programmer Name     : Lim Wei Hau
// Program Name        : rental-activities.js
// Description         : The UI for rental activities page
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
import { getRentalActivities } from "../redux/actions/dataActions";

// components/util
import { FlatListContainer } from "../util/containers";
import { LendActivity, BorrowActivity } from "../components/rental-components";
import ScreenLoadingModal from "../util/ScreenLoadingModal";

import dayjs from "dayjs";

const Title = (props) => (
  <View style={{ marginBottom: 20 }}>
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: "Roboto",
      }}
    >
      Rental Activities
    </Text>
    <Text
      style={{
        color: "#888",
        fontFamily: "sans-serif-light",
      }}
    >
      All the approved rental requests!
    </Text>
  </View>
);

const Activity = (props) => {
  const { amRenter } = props.item;

  return amRenter ? (
    <BorrowActivity item={props.item} />
  ) : (
    <LendActivity item={props.item} />
  );
};

const Activities = (props) => {
  let data = props.rentalActivities;

  if (!data || data.loading) return null;

  if (data.length === 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={data.loading}
            onRefresh={() => props.getRentalActivities()}
          />
        }
        style={{ margin: 50, flex: 1 }}
      >
        <Text style={{ fontSize: 16, color: "#888", alignSelf: "center" }}>
          No approved rental activity
        </Text>
      </ScrollView>
    );
  }

  let temp2 = { renter: [], owner: [], history: [] };
  if (data && data.length > 0) {
    data.forEach((rentalRequest) => {
      if (dayjs().isAfter(rentalRequest.endDate, "day")) {
        // end date passed. push it to history
        temp2.history.push(rentalRequest);
      } else if (rentalRequest.amRenter) {
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
  if (temp2.history.length > 0) {
    temp.push({ title: "HISTORY", data: temp2.history });
  }

  const renderItem = ({ item }) => <Activity item={item} />;

  return (
    <SectionList
      sections={data.loading ? [] : temp}
      contentContainerStyle={{
        paddingHorizontal: "3%",
      }}
      refreshControl={
        <RefreshControl
          refreshing={data.loading}
          onRefresh={() => props.getRentalActivities()}
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
      keyExtractor={(item) => item.activityId}
    />
  );
};

const activities = (props) => {
  useEffect(() => {
    props.getRentalActivities();
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
            props.navigation.navigate("Requests");
          }}
        >
          <Text style={{ color: "#fbb124", fontWeight: "bold" }}>
            PENDING...
          </Text>
        </TouchableOpacity>
      </View>
      <Activities
        rentalActivities={props.rentalActivities}
        getRentalActivities={props.getRentalActivities}
      />
      {props.rentalActivities.loading && <ScreenLoadingModal />}
    </FlatListContainer>
  );
};

const mapStateToProps = (state) => ({
  rentalActivities: state.data.rentalActivities,
});

const mapActionsToProps = {
  getRentalActivities,
};

export default connect(mapStateToProps, mapActionsToProps)(activities);
