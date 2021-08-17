// Programmer Name     : Lim Wei Hau
// Program Name        : store.js
// Description         : Global state (redux) initialization
// First Written on    : 25 December 2020
// Last Edited on      : 03 March 2021

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import dataReducer from "./reducers/dataReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
  data: dataReducer,
});

const enhancer = compose(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
