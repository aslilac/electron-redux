// Ideally this would be a symbol, but each process would get a unique instance.
const stop = "__ElectronReduxStopForwarding";

// Certain actions that we should never replay across stores.
const ignored = [/^@@/, /^redux-form/];

/**
 * stopForwarding takes an action, and will return a copy that will not be replayed in
 */
export function stopForwarding<T extends object>(action: T): T {
	return {
		...action,
		[stop]: true,
	};
}

/**
 * shouldForward ensures that the action meets the right format and isn't scoped locally
 */
export function shouldForward(action: unknown): boolean {
	// Not an object, or already marked
	if (typeof action !== "object" || action == null || stop in action) {
		return false;
	}

	// Check if it should be ignored.
	if ("type" in action && ignored.some((rule) => rule.test(action.type as string))) {
		return false;
	}

	return true;
}
