import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  SET_SIGNED_IN,
} from "../types";

const initialState = {
  // these are all the 'shared' state user properties
  // that can be accessed by the components via dispatching actions
  authenticated: false,
  loading: true,
  firstSignIn: true, // to stay at profile screen after updating profile (2nd time)
  credentials: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        // these are all the 'shared' state user properties
        // that can be accessed by the components via dispatching actions
        authenticated: false,
        loading: false,
        credentials: {},
        firstSignIn: true,
      };
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_SIGNED_IN:
      return {
        ...state,
        firstSignIn: false,
      };
    default:
      return state;
  }
};
