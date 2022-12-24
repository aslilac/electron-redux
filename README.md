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

[Documentation](packages/electron-redux/README.md)

## Contributors

This package is based on prior work by:

-   [Burkhard Reffeling](https://github.com/hardchor)
-   [Charlie Hess](https://github.com/CharlieHess)
-   [Roman Paradeev](https://github.com/sameoldmadness)
