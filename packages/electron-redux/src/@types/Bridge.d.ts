import type { MiddlewareAPI } from "redux";

declare global {
	interface ElectronReduxBridge {
		getMainState(): Promise<any>;
		subscribeToActions(store: MiddlewareAPI): void;
		sendAction(action: any): void;
	}

	interface Window {
		__ElectronReduxBridge: ElectronReduxBridge;
	}

	const __ElectronReduxBridge: ElectronReduxBridge;
}
