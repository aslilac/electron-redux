const { contextBridge, ipcRenderer } = require("electron");
import type { MiddlewareAPI } from "redux";
import { stopForwarding } from "./helpers/actions";
import { restore } from "./helpers/json";

const bridge: ElectronReduxBridge = {
	async getMainState() {
		let state;
		try {
			state = await ipcRenderer.invoke("mckayla.electron-redux.FETCH_STATE");
		} catch (cause) {
			throw new Error(
				"No Redux store found in main process. Did you use the syncMain enhancer?",
				{ cause },
			);
		}

		const restoredState = JSON.parse(state, restore);
		return restoredState;
	},
	subscribeToActions(store: MiddlewareAPI) {
		ipcRenderer.on("mckayla.electron-redux.ACTION", (_, action) => {
			store.dispatch(stopForwarding(action));
		});
	},
	sendAction(action: any) {
		ipcRenderer.send("mckayla.electron-redux.ACTION", action);
	},
};

// This will throw an error if contextIsolation is not enabled, so we try it to see if it works, and
// if not we can just mutate `window` directly.
try {
	contextBridge.exposeInMainWorld("__ElectronReduxBridge", bridge);
} catch {
	window.__ElectronReduxBridge = bridge;
}
