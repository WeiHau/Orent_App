// Programmer Name     : Lim Wei Hau
// Program Name        : dataReducer.js
// Description         : Global state (redux) initialization of information state
// First Written on    : 25 December 2020
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
  RESET_DATA,
  LOADING_MESSAGES,
  SET_MESSAGES,
  LOADING_MESSAGE,
  SET_MESSAGE,
  MESSAGE_USER,
  LOADING_RENTAL_REQUESTS,
  LOADING_RENTAL_ACTIVITIES,
  SET_RENTAL_REQUESTS,
  SET_RENTAL_ACTIVITIES,
  SET_REQUEST_APPROVAL,
} from "../types";

const initialState = {
  params: null,
  posts: { loading: true },
  post: { loading: true },
  messageUser: null,
  messages: { loading: true },
  message: { loading: true },
  userData: { loading: true },
  myPosts: { loading: true },
  rentalRequests: { loading: true },
  rentalActivities: { loading: true },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        posts: { loading: true },
      };
    case LOADING_POST:
      return {
        ...state,
        post: { loading: true },
      };
    case LOADING_USER_DATA:
      return {
        ...state,
        userData: { loading: true },
      };
    case LOADING_MY_POSTS:
      return {
        ...state,
        myPosts: { loading: true },
      };
    case SET_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case SET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload,
      };
    case EDIT_MY_POST:
      // set my posts side
      index = state.myPosts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.myPosts[index] = action.payload;

      return { ...state, myPosts: [...state.myPosts] };
    case ENABLE_DISABLE_POST:
      // set my posts side
      index = state.myPosts.findIndex(
        (post) => post.postId === action.payload.postId
      );

      state.myPosts[index] = {
        ...state.myPosts[index],
        isAvailable: action.payload.enable,
      };
      state = { ...state, myPosts: [...state.myPosts] };

      return {
        ...state,
      };
    case DELETE_POST:
      // set my posts side
      index = state.myPosts.findIndex((post) => post.postId === action.payload);
      state.myPosts.splice(index, 1);

      return { ...state, myPosts: [...state.myPosts] };
    case POST_POST:
      return {
        ...state,
        myPosts: [
          action.payload, // (it's the latest one) action.payload is gonna be the new post obj
          ...state.myPosts,
        ],
      };
    case LOADING_MESSAGES:
      return {
        ...state,
        messages: { loading: true },
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case LOADING_MESSAGE:
      return {
        ...state,
        message: { loading: true },
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case MESSAGE_USER:
      return {
        ...state,
        messageUser: action.payload,
      };
    case LOADING_RENTAL_REQUESTS:
      return {
        ...state,
        rentalRequests: { loading: true },
      };
    case LOADING_RENTAL_ACTIVITIES:
      return {
        ...state,
        rentalActivities: { loading: true },
      };
    case SET_RENTAL_REQUESTS:
      return {
        ...state,
        rentalRequests: action.payload,
      };
    case SET_RENTAL_ACTIVITIES:
      return {
        ...state,
        rentalActivities: action.payload,
      };
    case SET_REQUEST_APPROVAL:
      // remove it from requests
      index = state.rentalRequests.findIndex(
        (request) => request.requestId === action.payload
      );
      state.rentalRequests.splice(index, 1);
      return {
        ...state,
        rentalRequests: [...state.rentalRequests],
      };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
};
