// Ideally this would be a `Symbol`, but those are not JSON serializable.
const hydrateType = "__HydrateType";

/**
 * Preserves `Map` and `Set` values when serializing to JSON.
 */
export const preserve = (_: string, value: unknown): any => {
	if (value instanceof Map) {
		return {
			[hydrateType]: "Map",
			items: [...value],
		};
	}

	if (value instanceof Set) {
		return {
			[hydrateType]: "Set",
			items: [...value],
		};
	}

	return value;
};

/**
 * Restores `Map` and `Set` value when deserializing from JSON.
 */
export const restore = (_: string, value: unknown): any => {
	if (
		value != null &&
		typeof value === "object" &&
		hydrateType in value &&
		"items" in value &&
		Array.isArray(value.items)
	) {
		if (value[hydrateType] === "Map") {
			return new Map(value.items);
		}

		if (value[hydrateType] === "Set") {
			return new Set(value.items);
		}
	}

	return value;
};
