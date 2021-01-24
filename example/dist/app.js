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

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sqrt_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sqrt.worker */ \"./src/sqrt.worker.js\");\n// Import the worker\n\n\n// Create an instance of the worker\nconst sqrt = new _sqrt_worker__WEBPACK_IMPORTED_MODULE_0__.SquareRootWorker();\n\n// Define the computation event\nconst render = async({ target }) => {\n\n  // Compute the results\n  const result = await sqrt.calculate(target.value);\n  \n  // Update the result\n  document.querySelector('#output').innerHTML = `${result}<br>(rounded)`;\n};\n\n// Set the value to a random value\ndocument.querySelector('#input').value = Math.floor(Math.random() * 10000 + 1)\n\n// Bind the event listener\ndocument.querySelector('#input').addEventListener('input', render);\n\n// Trigger a rendering\ndocument.querySelector('#input').dispatchEvent(new Event('input'));\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/sqrt.worker.js":
/*!****************************!*\
  !*** ./src/sqrt.worker.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SquareRootWorker\": () => /* binding */ SquareRootWorker\n/* harmony export */ });\nclass SquareRootWorker {\n      constructor(params) {\n\n        // Create the worker\n        this.worker = new Worker(__webpack_require__.p + \"sqrt.worker.js\", {\"name\":\"SquareRootWorker\"});;\n\n        // Create the inital context\n        this.sendPayload({ method: 'createContext', params });\n\n        // Create a list of resolvers\n        const resolvers = [];\n\n        // Iterate through each of the methods\n        for (const method of [\"calculate\"]) {\n\n          // Add the property to the instance\n          Object.defineProperty(this, method, {\n            value: async(params) => {\n\n              // Generate a hash\n              const hash = (Math.random() * new Date()).valueOf().toString(24).substr(0, 8);\n\n              // Send the payload\n              this.sendPayload({ method, params, hash });\n\n              // Create a promise resolver\n              return new Promise(resolve => resolvers[hash] = resolve);\n            }\n          })\n        }\n\n        // Handle message payloads\n        this.worker.onmessage = (e) => {\n\n          // Parse the payload\n          const payload = JSON.parse(e.data);\n\n          // Extract the method and params from the payload\n          const { method, params, hash } = payload;\n\n          // Check if there is a resolver\n          if (resolvers[hash]) {\n\n            // Resolve the response\n            resolvers[hash](params);\n\n            // Delete the resolver\n            delete resolvers[hash];\n          }\n        }\n      }\n\n      // Send a payload to the worker\n      sendPayload({ method, params, hash }) {\n\n        // Generate a hash if one doesn't exist\n        if (!hash) hash = (Math.random() * new Date()).valueOf().toString(24).substr(0, 8);\n\n        // Send the payload to the worker\n        this.worker.postMessage(JSON.stringify({ method, params, hash }));\n      }\n    }\n\n//# sourceURL=webpack:///./src/sqrt.worker.js?");

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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;