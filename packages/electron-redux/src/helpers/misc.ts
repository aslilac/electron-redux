// We use this variable to store a stack trace of where the middleware is first initialized, to
// assist in debugging if someone accidentally enables it twice.
let previouslyInitialized: Error;

export function preventDoubleInitialization() {
	if (previouslyInitialized) {
		throw new Error("electron-redux has already been attached to a store", {
			cause: previouslyInitialized,
		});
	}

	// We are intentionally not actually throwing the error here, we just want to capture the call
	// stack that we first initialized from, so we can report it later.
	previouslyInitialized = new Error(
		"electron-redux was previously attached to a store here",
	);
}
