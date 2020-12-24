const { addItem, decrement, increment, store } = require("../store/renderer");

store.subscribe(() => {
	const state = store.getState();
	// eslint-disable-next-line no-console
	console.log("state", state);
	update(state);
});

function update(state) {
	const { count, items } = state;

	h.innerHTML = count;
	s.innerHTML = "";
	for (const p of items) {
		s.innerHTML += `${p} `;
	}
}

const h = document.querySelector("#count-display");
const d = document.querySelector("#count-decrement");
const i = document.querySelector("#count-increment");

d.addEventListener("click", () => store.dispatch(decrement()));
i.addEventListener("click", () => store.dispatch(increment()));

const s = document.querySelector("#set-display");
const x = document.querySelector("#set-input");
const a = document.querySelector("#set-confirm");

x.value = "";
a.addEventListener("click", () => {
	store.dispatch(addItem(x.value));
	x.value = "";
});

update(store.getState());
