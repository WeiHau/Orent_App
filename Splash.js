import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

// redux & api endpoint calling
import { connect } from "react-redux";
import { loginUser, setUnauthenticated } from "./redux/actions/userActions";

// securestore
import * as SecureStore from "expo-secure-store";

// screen stacks
import RootStack from "./screen-stacks/RootStack";

// components/util
import ScreenLoadingModal from "./util/ScreenLoadingModal";
import AppLoading from "expo-app-loading";

const Splash = (props) => {
  const [firstLoad, setFirstLoad] = useState(true);

  // try to auto login in with securestore
  const readSecureStore = async () => {
    try {
      const credentials = await SecureStore.getItemAsync("loginCredentials");
      // console.log("value of credentials: ", credentials);

      if (credentials) {
        const user = JSON.parse(credentials);
        props.loginUser(user);
      } else {
        props.setUnauthenticated(); // to stop user.loading
      }
    } catch (e) {
      console.log(e);
      props.navigation.navigate("Login");
    }
  };

  useEffect(() => {
    readSecureStore();
  }, []);

  if (props.user.loading)
    return firstLoad ? <AppLoading /> : <ScreenLoadingModal />;
  else if (firstLoad) setFirstLoad(false);

  // not loading anymore
  return <RootStack user={props.user} />;
};

const mapStateToProps = (state) => ({
  user: state.user, // get 'user' state from state.user (refer to store.js)
});

const mapActionsToProps = {
  loginUser,
  setUnauthenticated,
};

export default connect(mapStateToProps, mapActionsToProps)(Splash);
