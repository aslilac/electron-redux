import * as _ from "./_";

// Certain actions that we should never replay across stores
const blacklist = [/^@@/, /^redux-form/];
const validActionKeys = ["type", "payload", "error", "meta"];

export interface FluxStandardAction<
	Type extends string = string,
	Payload = undefined,
	Meta = undefined
> {
	type: Type;
	error?: boolean;
	payload?: Payload;
	meta?: Meta;
}

// Gives us just enough action type info to work for the functions below
export type GenericFluxAction = FluxStandardAction<
	string,
	unknown,
	{ scope?: "local" | string }
>;

/**
 * Determines if an action has an appropriate shape that is safe for forwarding
 */
export const isFSA = (action: any): action is GenericFluxAction =>
	_.isPlainObject(action) &&
	_.isString(action["type"]) &&
	Object.keys(action).every((key) => validActionKeys.includes(key));

/**
 * stopForwarding allows you to give it an action, and it will return an
 * equivalent action that will only play in the current process
 */
export const stopForwarding = (
	action: GenericFluxAction,
): GenericFluxAction => ({
	...action,
	meta: {
		...action.meta,
		scope: "local",
	},
});

/**
 * validateAction ensures that the action meets the right format and isn't scoped locally
 */
export const validateAction = (action: unknown): action is GenericFluxAction =>
	isFSA(action) &&
	action.meta?.scope !== "local" &&
	blacklist.every((rule) => !rule.test(action.type));
