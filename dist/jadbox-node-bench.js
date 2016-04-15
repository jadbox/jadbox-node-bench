(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar express = __webpack_require__(1);\nvar app = express();\nvar Rx = __webpack_require__(2);\nvar Rxo = Rx.Observable;\nvar _ = __webpack_require__(3);\nvar bodyParser = __webpack_require__(4);\nvar compression = __webpack_require__(5);\nvar zlib = __webpack_require__(6);\n\nvar PORT = 8088;\nvar RELOAD = true;\n\napp.use(compression({\n    'strategy': zlib.Z_FILTERED,\n    'level': 6\n}));\napp.use(bodyParser.json());\n\napp.use('/', function (req, res, next) {\n    var body = req.body;\n    if (!body.text) {\n        res.send('missing text parameter');\n        return;\n    }\n    console.log('Message text', req.body);\n\n    step1(body.text, function (x) {\n        return step2(x, function (y) {\n            return res.send({\n                'data': y\n            });\n        });\n    });\n});\n\napp.listen(PORT, function () {\n    console.log('Bench app listening on port', PORT);\n});\n\nfunction step1(text, cb) {\n    var c = text.split('');\n    var s1 = _.map(c, function (x) {\n        return 'char ' + x;\n    });\n    var s2 = _.chain(s1).map(function (x) {\n        return { char: x, foo: 'bar', random: { val: Math.random() } };\n    }).filter(function (x) {\n        return x.char.indexOf('w') === -1;\n    }).map(function (x) {\n        return x.char.replace('char ', '');\n    }).value();\n\n    cb(s2.join(''));\n}\n\nfunction step2(text, cb) {\n    Rxo.from(text).flatMap(function (x) {\n        return Rxo.fromArray(x.split(''));\n    }).map(function (x) {\n        return { char: x, foo: 'bar', random: { val: Math.random() } };\n    }).filter(function (x) {\n        return x.char.indexOf('d') === -1;\n    }).map(function (x) {\n        return x.char.replace('char ', '');\n    }).toArray().subscribe(function (x) {\n        cb(x.join(''));\n    });\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/index.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/index.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = require(\"express\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"express\"\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22express%22?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = require(\"rx\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"rx\"\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22rx%22?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = require(\"lodash\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"lodash\"\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = require(\"body-parser\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"body-parser\"\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("module.exports = require(\"compression\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"compression\"\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("module.exports = require(\"zlib\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"zlib\"\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22zlib%22?");

/***/ }
/******/ ])));