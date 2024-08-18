import {
	type Action,
	applyMiddleware,
	type Middleware,
	type Reducer,
	type StoreCreator,
	type StoreEnhancer,
	type UnknownAction,
} from "redux";
import { stopForwarding, shouldForward } from "../helpers/actions";
import { preventDoubleInitialization } from "../helpers/misc";

/**
 * This next bit is all just for being able to fill the store with the correct
 * state asynchronously, because blocking the thread feels bad for potentially
 * large stores.
 */
type InternalAction<S> = ReturnType<typeof replaceState<S>>;

/**
 * Creates an action that will replace the current state with the provided
 * state. The scope is set to local in this creator function to make sure it is
 * never forwarded.
 */
const replaceState = <S>(state: S) =>
	stopForwarding({
		type: "mckayla.electron-redux.REPLACE_STATE" as const,
		state,
	});

const wrapReducer =
	<S, A extends Action<any> = UnknownAction>(
		reducer: Reducer<S, A>,
	): Reducer<S, InternalAction<S> | A> =>
	(state, action) => {
		switch (action.type) {
			case "mckayla.electron-redux.REPLACE_STATE":
				return (action as InternalAction<S>).state;
			default:
				return reducer(state, action as A);
		}
	};

const middleware: Middleware = (store) => {
	__ElectronReduxBridge.subscribeToActions(store);

	return (next) => (action) => {
		if (shouldForward(action)) {
			__ElectronReduxBridge.sendAction(action);
		}

		return next(action);
	};
};

export const syncRenderer: StoreEnhancer = (createStore: StoreCreator) => {
	preventDoubleInitialization();

	if (typeof __ElectronReduxBridge === "undefined") {
		throw new Error(
			"This renderer process is not properly configured. Did you import @mckayla/electron-redux/preload in your preload script?",
		);
	}

	return (reducer, initialState) => {
		const store = createStore(
			// @ts-expect-error
			wrapReducer(reducer),
			initialState,
			applyMiddleware(middleware),
		);

		// This is the reason we need to be an enhancer, rather than a middleware. We use this (along
		// with the `wrapReducer` function above) to dispatch an action that initializes the store
		// without needing to fetch it synchronously.
		__ElectronReduxBridge.getMainState().then((state) => {
			store.dispatch(replaceState(state));
		});

		// XXX: TypeScript is dumb. If you return the call to createStore
		// immediately it's fine, but even assigning it to a constant and returning
		// will make it freak out. We fix this with the line below the return.
		return store;
		// XXX: Even though this is unreachable, it fixes the type signature????
		return {} as unknown as any;
	};
};
