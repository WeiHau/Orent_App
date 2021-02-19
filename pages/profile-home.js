import React, { useEffect } from "react";
import { View, Text } from "react-native";

// redux/userAction
import { connect } from "react-redux";
import { logoutUser, setSignedIn } from "../redux/actions/userActions";

// components/util
import {
  TopSection,
  LocationSection,
  ContactsSection,
} from "../components/profile-component";
import { ScreenContainer } from "../util/containers";
import { LogoutIcon } from "../util/icons";
import { MyButton2 } from "../util/my-form-elements";

const home = (props) => {
  const {
    user: { credentials },
  } = props;

  const {
    fullName,
    bio,
    handle,
    imageUrl,
    createdAt,
    location: { address, postcode, city, state },
    contact: { phoneNo, email, whatsappEnabled, facebook, instagram },
  } = credentials;

  return (
    <ScreenContainer>
      <View style={{ flex: 1, padding: "3%" }}>
        <TopSection
          imageUri={imageUrl}
          handle={handle}
          fullName={fullName}
          email={email}
          createdAt={createdAt}
          bio={bio}
          editProfileOnPress={() => {
            props.setSignedIn();
            props.navigation.navigate("Edit");
          }}
        />
        <LocationSection
          address={address}
          postcode={postcode}
          city={city}
          state={state}
          backgroundColor="#f2f2f2"
        />
        <ContactsSection
          phoneNo={phoneNo}
          waEnabled={whatsappEnabled}
          fb={facebook}
          ig={instagram}
          backgroundColor="#f2f2f2"
        />
        <View style={{ alignItems: "flex-end" }}>
          <MyButton2 onPress={props.logoutUser}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
            >
              <LogoutIcon style={{ color: "#f45c57", marginRight: 5 }} />
              <Text style={{ color: "#f45c57" }}>LOGOUT</Text>
            </View>
          </MyButton2>
        </View>
      </View>
    </ScreenContainer>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  logoutUser,
  setSignedIn,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
