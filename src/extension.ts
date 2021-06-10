// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
export function deactivate() {}

import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {

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
		
		if (i === arr.length - 1){
			i = 0;
		} else {
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

function updateStatusBarItem(): void {
    const n = getToDos(vscode.window.activeTextEditor).length;
    if (n > 0) {
        myStatusBarItem.text = `ToDo's: ${n}`;
        myStatusBarItem.show();
    } else {
        myStatusBarItem.hide();
    }
}

function getToDos(editor: vscode.TextEditor | undefined) {
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

