/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = exports.deactivate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
function deactivate() { }
exports.deactivate = deactivate;
const vscode = __webpack_require__(1);
let myStatusBarItem;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate({ subscriptions }) {
    let i = 0;
    const myCommandId = 'sample.listToDo';
    subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const arr = getToDos(editor);
        const position = editor.selection.active;
        var newPosition = position.with(arr[i], 0);
        var newSelection = new vscode.Selection(newPosition, newPosition);
        editor.selection = newSelection;
        if (i === arr.length - 1) {
            i = 0;
        }
        else {
            i++;
        }
    }));
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 500);
    myStatusBarItem.command = myCommandId;
    subscriptions.push(myStatusBarItem);
    subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
    subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
    updateStatusBarItem();
}
exports.activate = activate;
function updateStatusBarItem() {
    const n = getToDos(vscode.window.activeTextEditor).length;
    if (n > 0) {
        myStatusBarItem.text = `ToDo's: ${n}`;
        myStatusBarItem.show();
    }
    else {
        myStatusBarItem.hide();
    }
}
function getToDos(editor) {
    var arr = [];
    if (editor) {
        var line = 0;
        for (var i = 0; i < editor.document.lineCount; i++) {
            if (editor.document.lineAt(i).text.slice(0, 7) === "//ToDo:") {
                arr.push(i);
            }
            if (editor.document.lineAt(i).text.slice(0, 7) === "/*ToDo:") {
                arr.push(i);
            }
        }
    }
    return arr;
}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map