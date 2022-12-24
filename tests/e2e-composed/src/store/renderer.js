import { syncRenderer } from "@mckayla/electron-redux/renderer";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

const { reducer } = require("./common");

export const store = createStore(reducer, compose(syncRenderer, applyMiddleware(thunk)));

export * from "./common";
