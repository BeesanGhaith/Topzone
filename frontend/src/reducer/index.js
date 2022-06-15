// Store..
import { combineReducers, createStore } from "redux";
import loginReducer from "./login/index";
const reducers = combineReducers({ loginReducer });

// Create Store
const store = createStore(reducers);

export default store;
