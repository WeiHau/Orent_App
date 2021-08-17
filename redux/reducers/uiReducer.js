// Programmer Name     : Lim Wei Hau
// Program Name        : uiReducer.js
// Description         : Global state (redux) initialization of UI state
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
