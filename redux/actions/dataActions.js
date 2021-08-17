// Programmer Name     : Lim Wei Hau
// Program Name        : dataActions.js
// Description         : Global state (redux) handling of information state
// First Written on    : 20 December 2020
// Last Edited on      : 03 March 2021

import {
  SET_PARAMS,
  SET_POSTS,
  SET_POST,
  SET_USER_DATA,
  SET_MY_POSTS,
  EDIT_MY_POST,
  ENABLE_DISABLE_POST,
  POST_POST,
  DELETE_POST,
  LOADING_POSTS,
  LOADING_POST,
  LOADING_USER_DATA,
  LOADING_MY_POSTS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_MESSAGES,
  SET_MESSAGES,
  LOADING_MESSAGE,
  SET_MESSAGE,
  MESSAGE_USER,
  LOADING_RENTAL_REQUESTS,
  SET_RENTAL_REQUESTS,
  LOADING_RENTAL_ACTIVITIES,
  SET_RENTAL_ACTIVITIES,
  SET_REQUEST_APPROVAL,
} from "../types";
import axios from "axios";
import store from "../store";

export const getPosts =
  (params = null) =>
  (dispatch) => {
    dispatch({ type: LOADING_POSTS });

    axios
      .get("/posts", { params })
      .then((res) => {
        dispatch({ type: SET_POSTS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: SET_POSTS, payload: [] });
      });
  };

export const setParams = (params) => (dispatch) => {
  dispatch({ type: SET_PARAMS, payload: params });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_POST });

  axios
    .get(`/post/${postId}`)
    .then((res) => {
      dispatch({ type: SET_POST, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: SET_POST, payload: error.response.data });
    });
};

export const getMyPosts = () => (dispatch) => {
  dispatch({ type: LOADING_MY_POSTS });

  axios
    .get("/myposts")
    .then((res) => {
      dispatch({ type: SET_MY_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_MY_POSTS, payload: [] });
    });
};

export const editPost =
  (postId, editedPost, formData, navigation) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    const { errors, valid } = validatePost(editedPost);

    const theFunc = () =>
      axios
        .post(`/post/${postId}`, editedPost)
        .then((res) => {
          dispatch({ type: EDIT_MY_POST, payload: res.data });
          navigation.navigate("Home");
          dispatch(clearErrors());
        })
        .catch((err) => {
          dispatch({ type: SET_ERRORS, payload: err.response.data });
        });

    if (valid) {
      if (formData) {
        axios.post("post/image", formData).then((data) => {
          editedPost.image = data.data;
          theFunc();
        });
      } else {
        // user didnt change the post image
        theFunc();
      }
    } else {
      dispatch({ type: SET_ERRORS, payload: errors });
    }
  };

const isEmpty = (string) => {
  return string.trim() === "";
};

const validatePost = (postInfo) => {
  let errors = {};
  let { name, description, image, price } = postInfo;

  if (isEmpty(name)) errors.name = "Please complete this field";
  else if (name.length > 50) errors.name = "Please enter a shorter title";
  if (isEmpty(description)) errors.description = "Please complete this field";
  if (isEmpty(image)) errors.image = "Please complete this field";
  if (isEmpty(price)) errors.price = "Please complete this field";
  else if (isNaN(price)) errors.price = "NaN";
  else if (parseInt(price) > 999999) errors.price = "Lower!";

  return { errors, valid: Object.keys(errors).length === 0 };
};

export const postPost = (newPost, formData, navigation) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  // validate post (bad structure, should be done in backend TT)
  newPost.image = formData ? "temporary imageUri" : "";
  const { errors, valid } = validatePost(newPost);

  if (valid) {
    axios
      .post("post/image", formData)
      .then((data) => {
        newPost.image = data.data;
        return axios.post("/post", newPost);
      })
      .then((res) => {
        dispatch({ type: POST_POST, payload: res.data });
        navigation.navigate("Home");
        dispatch(clearErrors());
      })
      .catch((err) => {
        // secondary validation
        console.log(err);
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      });
  } else {
    dispatch({ type: SET_ERRORS, payload: errors });
  }
};

export const enablePost = (postId) => (dispatch) => {
  dispatch({ type: ENABLE_DISABLE_POST, payload: { postId, enable: true } });

  axios
    .get(`/post/${postId}/enable`)
    .catch((err) => console.log(err.response.data));
};

export const disablePost = (postId) => (dispatch) => {
  dispatch({ type: ENABLE_DISABLE_POST, payload: { postId, enable: false } });

  axios
    .get(`/post/${postId}/disable`)
    .catch((err) => console.log(err.response.data));
};

export const deletePost = (postId, navigation) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
      navigation.navigate("Home");
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_USER_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_USER_DATA,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({ type: SET_USER_DATA, payload: null });
    });
};

export const getMessages = () => (dispatch) => {
  dispatch({ type: LOADING_MESSAGES });

  axios
    .get(`/messages`)
    .then((res) => {
      dispatch({
        type: SET_MESSAGES,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({ type: SET_MESSAGES, payload: null });
    });
};

// when user sends a message to someone
export const sendMessage = (sentMessage) => (dispatch) => {
  const { recipient, content, createdAt } = sentMessage;
  let newMessage = {
    amSender: true,
    content: content,
    createdAt: createdAt,
  };

  let { messages, message } = store.getState().data;
  // go thru the existing messages (no need to check if userMessageExist, cuz it probably already is)
  if (!Array.isArray(messages)) return;

  if (message.user.handle === recipient) {
    // if user is current interacting with the user (probably is)

    dispatch({
      type: SET_MESSAGE,
      payload: {
        user: message.user,
        messages: [newMessage, ...message.messages],
      },
    });
    // messages[handleIndex]
  }

  let handleIndex = messages.findIndex(
    (msg) => msg.user && msg.user.handle === recipient
  );

  // shifting the element to first position
  let temp = messages.splice(handleIndex, 1);
  messages.unshift(temp[0]);

  // add message to state.messages,
  messages[0].messages.unshift(newMessage); // this method (merely) probably doesnt cause rerender
  dispatch({ type: SET_MESSAGES, payload: [...messages] });
};

// when user trying to write message to someone
export const setMessage =
  (userHandle = null) =>
  (dispatch) => {
    dispatch({ type: LOADING_MESSAGE });

    if (!userHandle) return; // means user returns to previous page

    // go thru the existing messages
    const messages = store.getState().data.messages;
    if (!Array.isArray(messages)) {
      dispatch({ type: SET_MESSAGE, payload: null }); // to stop loading
      return;
    }

    let handleIndex = messages.findIndex(
      (msg) => msg.user && msg.user.handle === userHandle
    );

    if (handleIndex !== -1) {
      // already have previous messages
      let seenMessageCreatedAtsArray = [];
      // read all messages of that user
      for (let message of messages[handleIndex].messages) {
        if (message.seen) break;

        if (!message.amSender) {
          message.seen = true;
          seenMessageCreatedAtsArray.push(message.createdAt);
        }
      }

      dispatch({ type: SET_MESSAGE, payload: { ...messages[handleIndex] } });
      dispatch({ type: SET_MESSAGES, payload: [...messages] });

      if (seenMessageCreatedAtsArray.length !== 0) {
        axios.get(`/messages/${userHandle}/read`, {
          params: { createdAts: seenMessageCreatedAtsArray },
        });
      }
    } else {
      // first message with this user
      // fetch user image & fullName
      axios
        .get(`/user/${userHandle}`)
        .then((res) => {
          if (!res.data.user.fullName) throw "User havent filled in data";

          const userMessageObject = {
            user: {
              handle: userHandle,
              imageUri: res.data.user.imageUrl,
              fullName: res.data.user.fullName,
              expoPushToken: res.data.user.expoPushToken,
            },
            messages: [],
          };

          dispatch({
            type: SET_MESSAGE,
            payload: userMessageObject,
          });

          // add to state.messages
          messages.unshift(userMessageObject);
          dispatch({
            type: SET_MESSAGES,
            payload: [...messages],
          });
        })
        .catch(() => {
          console.log("an error occurred (SET_MESSAGE)");
          dispatch({ type: SET_MESSAGE, payload: { error: true } });
        });
    }
  };

// when someone sent a message to user
export const receiveMessage = (receivedMessage) => (dispatch) => {
  // format the message first
  const newMessage = {
    amSender: false,
    content: receivedMessage.content,
    createdAt: receivedMessage.createdAt,
    seen: false,
  };

  // go thru the existing messages
  let { messages, message } = store.getState().data;
  if (!Array.isArray(messages)) return;
  let handleIndex = messages.findIndex(
    (msg) => msg.user && msg.user.handle === receivedMessage.sender
  );

  if (handleIndex !== -1) {
    // already have previous messages

    if (message.user && message.user.handle === receivedMessage.sender) {
      // if user is current interacting with the user
      newMessage.seen = true;

      dispatch({
        type: SET_MESSAGE,
        payload: {
          user: message.user,
          messages: [newMessage, ...message.messages],
        },
      });
      axios.get(`/messages/${receivedMessage.sender}/read`, {
        params: { createdAts: [newMessage.createdAt] },
      });
    }

    // shifting the userMessage to the first/top position
    let temp = messages.splice(handleIndex, 1);
    messages.unshift(temp[0]);

    // add message to state.messages,
    messages[0].messages.unshift(newMessage);
    dispatch({ type: SET_MESSAGES, payload: [...messages] });
  } else {
    // first message with this user
    // fetch user image & fullName
    axios
      .get(`/user/${receivedMessage.sender}`)
      .then((res) => {
        const userMessageObject = {
          user: {
            handle: receivedMessage.sender,
            imageUri: res.data.user.imageUrl,
            fullName: res.data.user.fullName,
            expoPushToken: res.data.user.expoPushToken,
          },
          messages: [newMessage],
        };

        // add to state.messages
        messages.unshift(userMessageObject);

        dispatch({
          type: SET_MESSAGES,
          payload: [...messages],
        });

        // user can't possibly be interacting with the user,
        // else the userMessageObject would exist in state.messages
      })
      .catch(() => {
        console.log("An error occured when receiving message");
      });
  }
};

export const setMessageUser = (handle) => (dispatch) => {
  dispatch({ type: MESSAGE_USER, payload: handle });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const sendRentalRequest = (request) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/rentalRequest", request)
    .then((res) => {
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getRentalRequests = () => (dispatch) => {
  dispatch({ type: LOADING_RENTAL_REQUESTS });

  axios
    .get("/rentalRequests")
    .then((res) => {
      dispatch({ type: SET_RENTAL_REQUESTS, payload: res.data });
    })
    .catch((err) => {
      // dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getRentalActivities = () => (dispatch) => {
  dispatch({ type: LOADING_RENTAL_ACTIVITIES });

  axios
    .get("/rentalActivities")
    .then((res) => {
      dispatch({ type: SET_RENTAL_ACTIVITIES, payload: res.data });
    })
    .catch((err) => {
      // dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const approveRentalRequest = (requestId, approve) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  // remove it from requests

  if (approve) {
    axios
      .get(`/rentalRequest/approve/${requestId}`)
      .then((res) => {
        dispatch({ type: SET_REQUEST_APPROVAL, payload: requestId });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      });
  } else {
    axios
      .get(`/rentalRequest/remove/${requestId}`)
      .then((res) => {
        dispatch({ type: SET_REQUEST_APPROVAL, payload: requestId });
        dispatch(clearErrors());
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      });
  }
};
