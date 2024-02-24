import * as vscode from "vscode";
import {
  extractMatchFromSelection,
  tranformSelectionToCSS,
} from "./extension.helper";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "nested-css-from-html.generate",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const { document, selection } = editor;
        let selectionText = document.getText(selection);

        const matchesClass = extractMatchFromSelection(selectionText);
        if (matchesClass) {
          const filterClass = tranformSelectionToCSS(matchesClass);
          let uniqueClass = [...new Set([...filterClass])];
          vscode.env.clipboard.writeText(uniqueClass.join("\n"));
          vscode.window.showInformationMessage(
            "Copied to clipboard successfully"
          );
        } else {
          let arrWord = selectionText
            .replace(/"/g, "")
            .split(" ")
            .map((item) => `.${item}{\n\n}`);
          let uniqueClass = [...new Set([...arrWord])];
          vscode.env.clipboard.writeText(uniqueClass.join("\n"));
          vscode.window.showInformationMessage(
            "Copied to clipboard successfully"
          );
        }
      }
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
