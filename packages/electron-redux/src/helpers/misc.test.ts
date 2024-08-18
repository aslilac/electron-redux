import { expect, test } from "vitest";
import { preventDoubleInitialization } from "./misc";

test("calling preventDoubleInitialization twice throws", () => {
	expect(preventDoubleInitialization).not.toThrow();
	expect(preventDoubleInitialization).toThrow();
});
