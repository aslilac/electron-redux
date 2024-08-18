const init = () => ({
	count: 0,
	items: new Set(["a"]),
});

export const increment = () => ({
	type: "INCREMENT",
});

export const decrement = () => ({
	type: "DECREMENT",
});

export const adjustBy = (amount) => ({
	type: "ADJUST_BY",
	payload: { amount },
});

export const addItem = (item) => ({
	type: "ADD_ITEM",
	payload: { item },
});

export const reducer = (state = init(), action) => {
	switch (action.type) {
		case "INCREMENT":
			return { ...state, count: state.count + 1 };
		case "DECREMENT":
			return { ...state, count: state.count - 1 };
		case "ADJUST_BY":
			return { ...state, count: state.count + action.payload.amount };
		case "ADD_ITEM": {
			const itemsCopy = new Set(state.items);
			itemsCopy.add(action.payload.item);
			return { ...state, items: itemsCopy };
		}
		default:
			return state;
	}
};
