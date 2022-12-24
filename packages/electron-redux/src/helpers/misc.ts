// We use this variable to store a stack trace of where the middleware
// is first initialized, to assist in debugging if someone accidentally enables
// it twice. This can easily be caused by importing files that are shared between
// the main and renderer processes.
let previouslyInitialized: Error;

export const preventDoubleInitialization = () => {
	if (previouslyInitialized) {
		// eslint-disable-next-line no-console
		console.error(new Error("electron-redux has already been attached to a store"));
		throw previouslyInitialized;
	}

	// We are intentionally not actually throwing the error here, we just
	// want to capture the call stack.
	previouslyInitialized = new Error(
		"electron-redux was previously attached to a store here",
	);
};
