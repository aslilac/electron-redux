import { syncRenderer } from "@mckayla/electron-redux/renderer";
import * as Redux from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "../common";

export const store = Redux.createStore(
	reducer,
	Redux.compose(Redux.applyMiddleware(thunk), syncRenderer),
);
export * from "../common";
