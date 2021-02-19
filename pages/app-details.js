import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

// redux & api endpoint calling
import { connect } from "react-redux";
import { updateUserDetails, logoutUser } from "../redux/actions/userActions";

// components/util
import {
  DetailsTitle,
  HandleTitle,
  LogoutText,
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
  SaveIcon,
} from "../util/icons";

// state array
import { stateArray } from "../util/constants";

const details = (props) => {
  const [imageUri, setImageUri] = useState(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");

  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [phoneNo, setPhoneNo] = useState("");
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

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

    if (imageUri) {
      formData = getFormData(imageUri);
    }

    props.updateUserDetails(userDetails, formData);
  };

  // catch errors
  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
      console.log("receive errors:" + JSON.stringify(props.UI.errors));
    }
  }, [props.UI.errors]);

  return (
    <ScreenContainer>
      <DetailsTitle />
      <HandleTitle handle={props.user.credentials.handle} />
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
                generatedState = getStateFromPostcode(e);
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
          alignItems: "flex-end",
          marginTop: 20,
          marginBottom: 40,
          marginRight: 10,
        }}
      >
        <MyButton2 onPress={saveDetails}>
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
          >
            <SaveIcon style={{ color: "#fbb124", marginRight: 5 }} />
            <Text style={{ color: "#fbb124" }}>SAVE</Text>
          </View>
        </MyButton2>
      </View>
      <LogoutText
        userHandle={props.user.credentials.handle}
        logout={() => {
          props.logoutUser();
        }}
      />
      {props.UI.loading && <ScreenLoadingModal />}
    </ScreenContainer>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = { updateUserDetails, logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(details);
