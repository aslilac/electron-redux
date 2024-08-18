import { app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import * as path from "node:path";
import { increment, store } from "./store.js";

const require = createRequire(import.meta.url);

store.subscribe(() => {
	console.log(store.getState());
});

setInterval(() => {
	store.dispatch(increment());
}, 3000);

const views = [];

const createWindow = () => {
	// Create the browser window.
	const view = new BrowserWindow({
		width: 1380,
		height: 830,
		webPreferences: {
			contextIsolation: true,
			preload: require.resolve("@mckayla/electron-redux/preload"),
		},
	});

	// and load the index.html of the app.
	view.loadURL(new URL("../renderer/build/index.html", import.meta.url).toString());

	// Open the DevTools.
	view.webContents.openDevTools();

	// Emitted when the window is closed.
	view.on("closed", () => {
		// Just close both if we close one
		app.quit();
	});

	views.push(view);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
	while (views.length < 2) {
		createWindow();
	}
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	app.quit();
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	while (views.length < 2) {
		createWindow();
	}
});
