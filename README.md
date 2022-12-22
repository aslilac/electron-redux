<h1 align="center">
<img height=100 src="https://cdn.mckayla.cloud/-/d622b29166eb46e080f5103f22e1d2a9/electron-redux-logo.svg" />
<br />
electron-redux
</h1>

If you're here reading this, you're probably familiar with the usual Redux dataflow. You
create an action, you dispatch it through your reducer, and your reducer updates your
store based on the action.

<!-- ![](https://cdn.mckayla.cloud/-/420c88951bf4468a8af84f4a738d4565/redux-flow.webp) -->

![a diagram detailing how data flows when using electron-redux](https://cdn.mckayla.cloud/-/401e0af828b84b358ca289676dc12101/electron-redux-flow.webp)

electron-redux taps into this flow, and allows you to dispatch your actions in your main
process _and_ your renderer processes simultaneously. You just need to dispatch each action
once to whichever store instance is convenient, and every store will be updated.

## Usage

```javascript
// in the main process
import { syncMain } from "@mckayla/electron-redux";
const store = createStore(reducer, syncMain);
```

```javascript
// in the renderer processes
import { syncRenderer } from "@mckayla/electron-redux";
const store = createStore(reducer, syncRenderer);
```

```javascript
// in your preload script
import "@mckayla/electron-redux/preload";
```

If you don't have your own preload script, you can specify the provided preload
script directly whenever you initialize a `BrowserWindow`

```javascript
// when initializing a BrowserWindow
const view = new BrowserWindow({
	webPreferences: {
		preload: require.resolve("@mckayla/electron-redux/preload"),
	},
});
```

### w/ Webpack

If you use Webpack to bundle your renderer code, and you don't have `nodeIntegration`
enabled, you might also need to prevent the electron module from being included in
your renderer bundle. You can do this by including the following in your Webpack config.

```javascript
// in your webpack.config.js
module.exports = {
	resolve: {
		alias: {
			electron: false,
		},
	},
};
```

### w/ Parcel (or Webpack)

In your renderer code, you'll actually want to import the store enhancer from a submodule.

```javascript
// in your renderer processes
import { syncRenderer } from "@mckayla/electron-redux/renderer";
const store = createStore(reducer, syncRenderer);
```

## Actions

Actions **MUST** be [FSA](https://github.com/acdlite/flux-standard-action#example)-compliant,
i.e. have a `type` and `payload` property. Any actions not passing this test will
be ignored and simply passed through to the next middleware.

> NB: `redux-thunk` is not FSA-compliant out of the box, but can still produce compatible actions once the async action fires.

Actions **MUST** be serializable

-   Objects with enumerable properties
-   Arrays
-   Numbers
-   Booleans
-   Strings
-   Maps
-   Sets

### Local actions

By default, all actions are played in all processes. If an action should only be
played in the current thread, then you can set the scope meta property to local.

```javascript
const myLocalActionCreator = () => ({
	type: "MY_ACTION",
	payload: 123,
	meta: {
		scope: "local", // only play the action locally
	},
});
```

We also provide a utility function for this

```javascript
import { stopForwarding } from "@mckayla/electron-redux";
dispatch(stopForwarding(action));
```

## Contributors

This package is based on prior work by:

-   [Burkhard Reffeling](https://github.com/hardchor)
-   [Charlie Hess](https://github.com/CharlieHess)
-   [Roman Paradeev](https://github.com/sameoldmadness)
