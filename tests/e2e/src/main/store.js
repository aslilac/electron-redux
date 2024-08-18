import { syncMain } from "@mckayla/electron-redux";
import * as Redux from "redux";
import { reducer } from "../common.js";

export const store = Redux.createStore(reducer, syncMain);
export * from "../common.js";
