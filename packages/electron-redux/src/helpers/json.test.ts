import { describe, expect, test } from "vitest";
import { preserve, restore } from "./json";

describe("freezing and hydrating", () => {
	const fresh = {
		a: 1,
		b: undefined,
		c: null,
		d: new Set(["hello", "friend"]),
		e: new Map([
			["mckayla", "mckayla@hey.com"],
			["tim", "tim@apple.com"],
		]),
		f: {
			a: false,
			b: new Set(["hi", "sailor"]),
			c: new Set([0, 1, 2, 3, 4, 5]),
			d: new Map<number | string, string>([
				[0, "zero"],
				[1, "one"],
				[2, "two"],
				[3, "three"],
				[4, "four"],
				[5, "five"],
				["5", "five but a string"],
			]),
		},
	};

	test("freezing a Map produces valid JSON", () => {
		const map = new Map<number | string, string>([
			[0, "number"],
			["0", "string"],
			["A", "a"],
			["B", "b"],
			["C", "c"],
		]);

		expect(JSON.stringify(map, preserve)).toMatchSnapshot();
	});

	test("freezing a Set produces valid JSON", () => {
		const set = new Set([1, 2, 3]);

		expect(JSON.stringify(set, preserve)).toMatchSnapshot();
	});

	test("freezing and hydrating an object should retain deep equality", () => {
		expect(JSON.parse(JSON.stringify(fresh, preserve), restore)).toEqual(fresh);
	});
});
