/// <reference types="jest" />
import { preventDoubleInitialization } from "./misc";

test("calling preventDoubleInitialization twice throws", () => {
	jest.spyOn(console, "error").mockImplementation(jest.fn());

	expect(preventDoubleInitialization).not.toThrow();
	expect(preventDoubleInitialization).toThrow();

	// eslint-disable-next-line no-console
	expect(console.error).toHaveBeenCalled();
});
