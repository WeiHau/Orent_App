// Programmer Name     : Lim Wei Hau
// Program Name        : profile-edit.js
// Description         : The UI for edit profile page
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";

// redux & api endpoint calling
import { connect } from "react-redux";
import {
  updateUserDetails,
  logoutUser,
  clearErrors,
} from "../redux/actions/userActions";
import store from "../redux/store";

// components/util
import {
  HandleTitle,
  ProfileImage,
  WhatsappCheckBox,
} from "../components/profile-form-components";
import {
  MyTextInput,
  MyButton2,
  MyPicker,
  MyTextArea,
} from "../util/my-form-elements";
import { ScreenContainer, FormSection } from "../util/containers";
import {
  getStateFromPostcode,
  pickImage,
  getFormData,
} from "../util/functions";
import ScreenLoadingModal from "../util/ScreenLoadingModal";

// icons
import {
  UserIcon,
  LocationIcon,
  ContactsIcon,
  PhoneIcon,
  FbIcon,
  IgIcon,
  BackIcon,
  SaveIcon,
} from "../util/icons";

// state array
import { stateArray } from "../util/constants";

const details = (props) => {
  const {
    user: { credentials },
  } = props;

  const [imageUri, setImageUri] = useState(credentials.imageUrl);
  const [fullName, setFullName] = useState(credentials.fullName);
  const [bio, setBio] = useState(credentials.bio);

  const [address, setAddress] = useState(credentials.location.address);
  const [postcode, setPostcode] = useState(credentials.location.postcode);
  const [city, setCity] = useState(credentials.location.city);
  const [state, setState] = useState(credentials.location.state);

  const [phoneNo, setPhoneNo] = useState(credentials.contact.phoneNo);
  const [whatsappEnabled, setWhatsappEnabled] = useState(
    credentials.contact.whatsappEnabled
  );
  const [facebook, setFacebook] = useState(credentials.contact.facebook);
  const [instagram, setInstagram] = useState(credentials.contact.instagram);

  const [errors, setErrors] = useState({});

  const saveDetails = () => {
    const userDetails = {};

    userDetails.fullName = fullName;
    if (bio) userDetails.bio = bio;

    userDetails.address = address;
    userDetails.postcode = postcode;
    userDetails.city = city;
    userDetails.state = state;

    if (phoneNo) {
      userDetails.phoneNo = phoneNo;
      userDetails.whatsappEnabled = whatsappEnabled;
    }
    if (facebook) userDetails.facebook = facebook;
    if (instagram) userDetails.instagram = instagram;

    let formData = null;

    if (
      imageUri &&
      imageUri !==
        "https://firebasestorage.googleapis.com/v0/b/apu-fyp-3cfd9.appspot.com/o/no-img.png?alt=media"
    ) {
      formData = getFormData(imageUri);
    }

    props.updateUserDetails(userDetails, formData);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // Screen was focused
      // clear errors
      setErrors({});
      // clear redux errors
      store.dispatch({ type: "CLEAR_ERRORS" });
    });

    return unsubscribe;
  }, [props.navigation]);

  // catch errors
  useEffect(() => {
    if (props.UI.errors) {
      if (props.UI.errors.action) {
        Alert.alert(
          `Profile is ${props.UI.errors.action}.`,
          "You account is currently associated to one of the rental activities/requests. \n\nPlease reject all the requests, or wait until all the activities are removed."
        );
      } else {
        setErrors(props.UI.errors);
        console.log("receive errors:" + JSON.stringify(props.UI.errors));
      }
    }
  }, [props.UI.errors]);

  return (
    <ScreenContainer>
      <HandleTitle handle={credentials.handle} />
      <View style={{ marginBottom: 20, padding: "5%" }}>
        <ProfileImage
          imageUri={imageUri}
          pickImage={() => pickImage(setImageUri)}
        />
        <MyTextArea
          placeholder="Write a bio..."
          value={bio}
          onChangeText={(e) => {
            setBio(e);
          }}
        />
        <MyTextInput
          placeholder="FULL NAME"
          value={fullName}
          onChangeText={(e) => {
            setFullName(e);
          }}
          error={errors.fullName}
          clearError={() => {
            setErrors({ ...errors, fullName: null });
          }}
          Icon={UserIcon}
        />
      </View>
      <FormSection title="LOCATION" Icon={LocationIcon}>
        <MyTextInput
          placeholder="ADDRESS"
          value={address}
          onChangeText={(e) => {
            setAddress(e);
          }}
          error={errors.address}
          clearError={() => {
            setErrors({ ...errors, address: null });
          }}
        />
        <MyTextInput
          placeholder="CITY/TOWN"
          value={city}
          onChangeText={(e) => {
            setCity(e);
          }}
          error={errors.city}
          clearError={() => {
            setErrors({ ...errors, city: null });
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <MyTextInput
            placeholder="POSTCODE"
            value={postcode}
            onChangeText={(e) => {
              setPostcode(e);
              if (e.length === 5 && !isNaN(e)) {
                let generatedState = getStateFromPostcode(e);
                if (generatedState) setState(generatedState);
              }
            }}
            error={errors.postcode}
            clearError={() => {
              setErrors({ ...errors, postcode: null });
            }}
            viewStyle={{ width: "30%" }}
            keyboardType="numeric"
          />
          <MyPicker
            viewStyle={{ width: "65%" }}
            selectedValue={state}
            onValueChange={(e) => setState(e)}
            options={stateArray}
          />
        </View>
      </FormSection>
      <FormSection title="CONTACTS" Icon={ContactsIcon}>
        <Text
          style={{
            marginLeft: 3,
            marginBottom: 10,
            color: "#888",
            fontSize: 12,
          }}
        >
          Optional section. Feel free to leave any field empty.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <MyTextInput
            placeholder="PHONE NO."
            value={phoneNo}
            onChangeText={(e) => {
              setPhoneNo(e);
            }}
            error={errors.phoneNo}
            clearError={() => {
              setErrors({ ...errors, phoneNo: null });
            }}
            keyboardType="numeric"
            Icon={PhoneIcon}
            viewStyle={{ flex: 1 }}
          />
          <WhatsappCheckBox
            disabled={!phoneNo}
            value={whatsappEnabled}
            onValueChange={(e) => setWhatsappEnabled(e)}
          />
        </View>
        <MyTextInput
          placeholder="FB PROFILE/LINK"
          value={facebook}
          onChangeText={(e) => {
            setFacebook(e);
          }}
          Icon={FbIcon}
        />
        <MyTextInput
          placeholder="IG PROFILE/LINK"
          value={instagram}
          onChangeText={(e) => {
            setInstagram(e);
          }}
          Icon={IgIcon}
        />
      </FormSection>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <MyButton2
          onPress={() => {
            props.clearErrors();
            props.navigation.navigate("Home");
          }}
          style={{ width: "25%" }}
        >
          <BackIcon style={{ color: "#f45c57" }} />
        </MyButton2>
        <MyButton2 onPress={saveDetails} style={{ width: "25%" }}>
          <SaveIcon style={{ color: "#fbb124" }} />
        </MyButton2>
      </View>
      {props.UI.loading && <ScreenLoadingModal />}
    </ScreenContainer>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = { updateUserDetails, logoutUser, clearErrors };

export default connect(mapStateToProps, mapActionsToProps)(details);
