/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@oneisland/worker-module/index.js":
/*!*********************************************************!*\
  !*** ../node_modules/@oneisland/worker-module/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WorkerModule\": () => /* binding */ WorkerModule\n/* harmony export */ });\n// Define the worker module abstraction\nclass WorkerModule {\n\n  constructor() {}\n\n  // Send payload\n  sendPayload({ method, params, hash }) {\n\n    // Generate a hash if there isn't one\n    if (!hash) hash = (Math.random() * new Date()).valueOf().toString(24).substr(0, 8);\n\n    // Post a message\n    postMessage(JSON.stringify({ method, params, hash }));\n  }\n\n  // Create the instance\n  static create(context) {\n\n    // Create a new worker module\n    const worker = new WorkerModule();\n\n    // Handle the message events\n    onmessage = (e) => {\n      \n      // Parse the payload\n      const payload = JSON.parse(e.data);\n\n      // Extract the method, params and hash from the payload\n      const { method, params, hash } = payload;\n\n      // Handle the init method\n      if (!worker.context && method == 'createContext') {\n        \n        // Bind an instance for context\n        worker.context = new context(params);\n      }\n\n      // Handle all other methods\n      if (worker.context && method != 'createContext') {\n        \n        // Call the method asyncronous\n        Promise.resolve(worker.context[method](params)).then(payload => {\n\n          console.log(payload)\n\n          // Send back the response payload\n          worker.context.sendPayload({ method, params: payload, hash });\n        });\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack:///../node_modules/@oneisland/worker-module/index.js?");

/***/ }),

/***/ "../node_modules/@oneisland/worker-module/loader.js??ruleSet[1].rules[0]!./src/sqrt.worker.js":
/*!****************************************************************************************************!*\
  !*** ../node_modules/@oneisland/worker-module/loader.js??ruleSet[1].rules[0]!./src/sqrt.worker.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SquareRootWorker\": () => /* binding */ SquareRootWorker\n/* harmony export */ });\n/* harmony import */ var _oneisland_worker_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @oneisland/worker-module */ \"../node_modules/@oneisland/worker-module/index.js\");\n\n      // Import the worker module\n// import { WorkerModule } from '../../index';\n\n\n// Create a worker to solve square roots\nclass SquareRootWorker extends _oneisland_worker_module__WEBPACK_IMPORTED_MODULE_0__.WorkerModule {\n  \n  // Instantiate as a WorkerModule\n  constructor() { super() }\n\n  // Perform a calculation\n  calculate(number) {\n    return Math.sqrt(number).toFixed(2);\n  }\n}\n\n\n      _oneisland_worker_module__WEBPACK_IMPORTED_MODULE_0__.WorkerModule.create(SquareRootWorker);\n    \n\n//# sourceURL=webpack:///./src/sqrt.worker.js?../node_modules/@oneisland/worker-module/loader.js??ruleSet%5B1%5D.rules%5B0%5D");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("../node_modules/@oneisland/worker-module/loader.js??ruleSet[1].rules[0]!./src/sqrt.worker.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;