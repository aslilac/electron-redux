import { ipcMain, webContents } from "electron";
import {
	applyMiddleware,
	type Middleware,
	type StoreCreator,
	type StoreEnhancer,
} from "redux";
import { stopForwarding, shouldForward } from "../helpers/actions";
import { preserve } from "../helpers/json";
import { preventDoubleInitialization } from "../helpers/misc";

const middleware: Middleware = (store) => {
	// When a new renderer asks for the current state...
	ipcMain.handle("mckayla.electron-redux.FETCH_STATE", () => {
		// While serializing the state, we preserve certain types that you might want to use in your,
		// state, but aren't JSON serializable.
		return JSON.stringify(store.getState(), preserve);
	});

	// When receiving an action from a renderer...
	ipcMain.on("mckayla.electron-redux.ACTION", (event, action: any) => {
		const localAction = stopForwarding(action);
		store.dispatch(localAction);

		// Forward it to all of the other renderers.
		for (const contents of webContents.getAllWebContents()) {
			// Ignore the renderer that sent the action.
			if (contents.id !== event.sender.id) {
				contents.send("mckayla.electron-redux.ACTION", localAction);
			}
		}
	});

	// If an action is dispatched in the main process...
	return (next) => (action) => {
		if (shouldForward(action)) {
			for (const contents of webContents.getAllWebContents()) {
				contents.send("mckayla.electron-redux.ACTION", action);
			}
		}

		return next(action);
	};
};

export const syncMain: StoreEnhancer = (createStore: StoreCreator) => {
	preventDoubleInitialization();

	return (reducer, state) => {
		return createStore(reducer, state, applyMiddleware(middleware));
		// XXX: Even though this is unreachable, it fixes the type signature????
		return {} as unknown as any;
	};
};
