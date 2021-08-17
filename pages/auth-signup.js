// Programmer Name     : Lim Wei Hau
// Program Name        : auth-signup.js
// Description         : The UI for signup page
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";

// redux & api endpoint calling
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

// components/util
import { SignUpTitle, LoginText } from "../components/auth-components";
import { MyTextInput, MyButton } from "../util/my-form-elements";
import { ScreenContainer } from "../util/containers";
import ScreenLoadingModal from "../util/ScreenLoadingModal";

// icons
import { UserIcon, EmailIcon, LockIcon } from "../util/icons";

const Decoration = (props) => (
  <View style={{ alignItems: "flex-end" }}>
    <View
      style={{
        backgroundColor: "#fccf3f",
        position: "absolute",
        width: 120,
        height: 120,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 60,
        transform: [{ rotateZ: "40deg" }],
      }}
    />
    <View
      style={{
        width: 115,
        height: 120,
        borderWidth: 1,
        borderColor: "#aaa",
        position: "absolute",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 30,
        transform: [{ rotateZ: "80deg" }],
      }}
    />
    <View
      style={{
        position: "absolute",
        backgroundColor: "orange",
        width: 115,
        height: 120,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 50,
        transform: [{ rotateZ: "100deg" }],
      }}
    />
  </View>
);

const signup = (props) => {
  const { navigation } = props;

  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const register = () => {
    const newUserData = {
      handle,
      email,
      password,
      confirmPassword,
    };

    props.signupUser(newUserData);
  };

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
      console.log("receive errors:" + JSON.stringify(props.UI.errors));
    }
  }, [props.UI.errors]);

  useEffect(() => {
    if (props.user.verifyingEmail) {
      Alert.alert(
        "Registration Success",
        "Please check your mailbox for email verification before login"
      );
      props.navigation.navigate("Login");
    }
  }, [props.user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Screen was focused
      // clear everything
      setHandle("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScreenContainer style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          padding: "5%",
          justifyContent: "space-between",
        }}
      >
        <Decoration />
        <View />
        <View />
        <View>
          <SignUpTitle />
          <View>
            <MyTextInput
              placeholder="USER HANDLE (ID)"
              value={handle}
              onChangeText={(e) => setHandle(e)}
              error={errors.handle}
              clearError={() => {
                setErrors({ ...errors, handle: null });
              }}
              Icon={UserIcon}
            />
            <MyTextInput
              placeholder="EMAIL"
              value={email}
              onChangeText={(e) => setEmail(e)}
              error={errors.email}
              clearError={() => {
                setErrors({ ...errors, email: null });
              }}
              Icon={EmailIcon}
              keyboardType="email-address"
            />
            <MyTextInput
              placeholder="PASSWORD"
              secureTextEntry
              value={password}
              secureTextEntry
              onChangeText={(e) => setPassword(e)}
              error={errors.password}
              clearError={() => {
                setErrors({ ...errors, password: null });
              }}
              Icon={LockIcon}
            />
            <MyTextInput
              placeholder="CONFIRM PASSWORD"
              secureTextEntry
              value={confirmPassword}
              secureTextEntry
              onChangeText={(e) => setConfirmPassword(e)}
              error={errors.confirmPassword}
              clearError={() => {
                setErrors({ ...errors, confirmPassword: null });
              }}
              Icon={LockIcon}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <MyButton onPress={register} style={{ width: "40%" }}>
            <Text style={{ color: "#fff" }}>SIGN UP</Text>
          </MyButton>
        </View>
        <LoginText navigation={navigation} />
      </View>
      {props.UI.loading && <ScreenLoadingModal />}
    </ScreenContainer>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(signup);
