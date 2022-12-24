<h1 align="center">
<img height=100 src="https://cdn.mckayla.cloud/-/d622b29166eb46e080f5103f22e1d2a9/electron-redux-logo.svg" />
<br />
electron-redux
</h1>

## Usage

```javascript
// in the main process
import { syncMain } from "@mckayla/electron-redux";
const store = createStore(reducer, syncMain);
```

```javascript
// in the renderer processes
import { syncRenderer } from "@mckayla/electron-redux/renderer";
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

### w/ redux-thunk (or any other middleware/enhancer)

Just use the `compose` function provided by Redux

```javascript
import { syncRenderer } from "@mckayla/electron-redux/renderer";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

const store = createStore(reducer, compose(syncRenderer, applyMiddleware(thunk)));
```

## Actions

Actions **must** be [FSA](https://github.com/acdlite/flux-standard-action#example)-compliant,
i.e. have a `type` and `payload` property. Any actions not passing this test will
be ignored and simply passed through to the next middleware.

Actions **must** be serializable. electron-redux supports serializing anything that
`JSON.stringify` can usually handle, as well as `Map` and `Set`.

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
