import { expect, test } from "vitest";
import { stopForwarding, shouldForward } from "./actions";

test("stopForwarding should cause shouldForward to return false", () => {
	const action = {
		type: "mckayla.electron-redux.DNF_TEST",
	};

	expect(shouldForward(action)).toBe(true);
	expect(shouldForward(stopForwarding(action))).toBe(false);
});
