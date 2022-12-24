const init = () => ({
	count: 0,
	items: new Set(["a", "b", "c"]),
});

// type Action =
// 	| ReturnType<typeof increment>
// 	| ReturnType<typeof decrement>
// 	| ReturnType<typeof adjustBy>;
//  | ReturnType<typeof addItem>;

exports.increment = () => ({
	type: "INCREMENT",
});

exports.decrement = () => ({
	type: "DECREMENT",
});

exports.adjustBy = (amount) => ({
	type: "ADJUST_BY",
	payload: { amount },
});

exports.addItem = (item) => ({
	type: "ADD_ITEM",
	payload: { item },
});

exports.reducer = (state = init(), action) => {
	switch (action.type) {
		case "INCREMENT":
			return { ...state, count: state.count + 1 };
		case "DECREMENT":
			return { ...state, count: state.count - 1 };
		case "ADJUST_BY":
			return { ...state, count: state.count + action.payload.amount };
		case "ADD_ITEM": {
			const copy = new Set(state.items);
			copy.add(action.payload.item);
			return { ...state, items: copy };
		}
		default:
			return state;
	}
};
