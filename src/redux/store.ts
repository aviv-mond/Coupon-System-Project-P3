import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authState";
import { CouponReducer } from "./couponState";

const reducers = combineReducers({authState: AuthReducer, couponState: CouponReducer});
const store = configureStore({reducer: {reducers}});

export default store;
