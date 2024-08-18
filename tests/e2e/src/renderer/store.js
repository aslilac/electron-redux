import { syncRenderer } from "@mckayla/electron-redux/renderer";
import * as Redux from "redux";
import { reducer } from "../common";

export const store = Redux.createStore(reducer, syncRenderer);
export * from "../common";
