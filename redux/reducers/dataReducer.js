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

      // set all posts side (not necessary)
      // index = state.posts.findIndex(
      //   (post) => post.postId === action.payload.postId
      // );
      // if (index !== -1) state.posts[index] = action.payload;

      // if (state.post.postId === action.payload.postId) {
      //   state.post = action.payload;
      // }

      return {
        ...state,
      };
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
      // setting all posts side is a little troublesome...
      // (filtering makes enabling doesnt know whether or not to put the post)

      // if (state.post.postId === action.payload.postId) {
      //   state.post = action.payload;
      // }

      return {
        ...state,
      };
    case DELETE_POST:
      // set my posts side
      index = state.myPosts.findIndex((post) => post.postId === action.payload);
      state.myPosts.splice(index, 1);

      // set all posts side (not necessary)
      // index = state.posts.findIndex((post) => post.postId === action.payload);
      // if (index !== -1) state.posts.splice(index, 1);

      return {
        ...state,
      };
    case POST_POST:
      // setting all posts side is a little troublesome...
      // (filtering makes it hard to know whether or not to put the post)
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
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
};
