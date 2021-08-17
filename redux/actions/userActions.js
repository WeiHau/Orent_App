// Programmer Name     : Lim Wei Hau
// Program Name        : userActions.js
// Description         : Global state (redux) handling of user state
// First Written on    : 20 December 2020
// Last Edited on      : 03 March 2021

import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  SET_SIGNED_IN,
  RESET_DATA,
} from "../types";
import axios from "axios";

// securestore
import * as SecureStore from "expo-secure-store";

export const signupUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("signup", userData)
    .then((res) => {
      // verification email sent
      // show alert ("signed up successfully. please check your mailbox for email verification");
      // ends here

      dispatch({
        type: SET_USER,
        payload: { verifyingEmail: true, authenticated: false },
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("login", userData)
    .then((res) => {
      console.log(`User logged in`);
      //console.log(res.data.token);
      setAuthorizationHeader(res.data.token);

      // save credentials into securestore
      const { email, password } = userData;
      saveCredentials({ email, password });
      console.log("logged in with details: " + userData.email);

      dispatch(getUserData()); // get all the user's details & put them into global state (redux)
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
      dispatch({ type: SET_UNAUTHENTICATED });
    });
};

// action creator (when a function is created to just dispatch an action)
// can be called: dispatch(clearErrors());
export const setUnauthenticated = () => (dispatch) => {
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const setSignedIn = () => (dispatch) => {
  dispatch({ type: SET_SIGNED_IN });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI }); // dispatch loading for uploading/setting image in server db
  axios
    .post("user/image", formData)
    .then(() => {
      dispatch(getUserData());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  // remove the axios header

  axios.post("user/expoPushToken", { expoPushToken: null }).catch((err) => {
    console.log("error");
    console.log(err);
  });

  delete axios.defaults.headers.common["Authorization"];

  try {
    SecureStore.deleteItemAsync("loginCredentials");
    dispatch({ type: RESET_DATA });
    dispatch({ type: SET_UNAUTHENTICATED });
  } catch (e) {
    console.log(e);
  }
};

// get the authorized (own) user data
// contain self info & not for other users to get
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER }); // dispatch loading for retrieving user details from server db
  axios
    .get("user") // retrieve user details from db (middleware/fbAuth did the who-is-it job using the authtoken)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data }); // then set the retrived data to state & stop loading
    })
    .catch((err) => console.log(err));
};

export const setExpoPushToken = (expoPushToken) => (dispatch) => {
  // console.log(expoPushToken);
  axios.post("user/expoPushToken", { expoPushToken }).catch((err) => {
    console.log("error");
    console.log(err);
  });
};

// update/save user details
export const updateUserDetails = (userDetails, formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/user", userDetails)
    .then(() => {
      // user details updated
      dispatch({ type: CLEAR_ERRORS });

      if (formData) dispatch(uploadImage(formData));
      else dispatch(getUserData());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
      console.log(err.response.data);
    });
};

const saveCredentials = async (credentials) => {
  try {
    await SecureStore.setItemAsync(
      "loginCredentials",
      JSON.stringify(credentials)
    );
  } catch (e) {
    console.log(e);
  }
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;

  // // store the token in local storage so when someone refreshes the page or close and reopens the browser will have access to the token locally
  // localStorage.setItem("FBIdToken", FBIdToken);

  // after setting the code below, everytime we sent request thru axios the header will have the auth value
  // (this includes those unprotected routes, but it's not really an issue)
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
