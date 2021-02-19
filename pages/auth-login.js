import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

// redux & api endpoint calling
import { connect } from "react-redux";
import { loginUser, clearErrors } from "../redux/actions/userActions";

// icons
import { EmailIcon, LockIcon } from "../util/icons";

// components/util
import { LoginTitle, SignUpText } from "../components/auth-components";
import { MyTextInput, MyButton } from "../util/my-form-elements";
import { ScreenContainer } from "../util/containers";
import ScreenLoadingModal from "../util/ScreenLoadingModal";

//#fbb124

const Decoration = (props) => (
  <View style={{ alignItems: "flex-end" }}>
    <View
      style={{
        backgroundColor: "#fccf3f",
        position: "absolute",
        width: 150,
        height: 150,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 60,
        transform: [{ rotateZ: "30deg" }],
      }}
    />
    <View
      style={{
        width: 140,
        height: 150,
        borderWidth: 1,
        borderColor: "#aaa",
        position: "absolute",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 30,
        transform: [{ rotateZ: "100deg" }],
      }}
    />
    <View
      style={{
        position: "absolute",
        backgroundColor: "orange",
        width: 140,
        height: 150,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 50,
        transform: [{ rotateZ: "60deg" }],
      }}
    />
  </View>
);

const login = (props) => {
  const { navigation } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const login = () => {
    props.loginUser({ email, password });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Screen was focused
      // clear everything
      setEmail("");
      setPassword("");
      setErrors({});
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
  }, [props.UI.errors]);

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
        <View>
          <LoginTitle />
          <View>
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
              value={password}
              secureTextEntry
              onChangeText={(e) => setPassword(e)}
              error={errors.password}
              clearError={() => {
                setErrors({ ...errors, password: null });
              }}
              Icon={LockIcon}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            {errors.error ? (
              <Text
                style={{
                  color: "#cc0000",
                  textAlign: "center",
                }}
              >
                {errors.error}
              </Text>
            ) : (
              <Text
                style={{
                  color: "transparent",
                  textAlign: "center",
                }}
              >
                Some Text
              </Text>
            )}
          </View>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <MyButton onPress={login} style={{ width: "40%" }}>
              <Text style={{ color: "#fff" }}>LOGIN</Text>
            </MyButton>
          </View>
        </View>
        <SignUpText navigation={navigation} />
      </View>
      {props.UI.loading && <ScreenLoadingModal />}
    </ScreenContainer>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(login);
