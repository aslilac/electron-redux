const { syncRenderer } = require("@mckayla/electron-redux/renderer");
const redux = require("redux");

const { reducer, ...actions } = require("./common");

const store = redux.createStore(reducer, syncRenderer);

module.exports = {
	store,
	...actions,
};
