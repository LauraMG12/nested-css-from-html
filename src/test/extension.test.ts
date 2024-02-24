import * as assert from "assert";
import * as vscode from "vscode";

import {
  extractMatchFromSelection,
  tranformSelectionToCSS,
} from "../extension.helper";
import {
  CASE1_CSS,
  CASE1_HTML,
  CASE1_MATCHED,
  CASE2_CSS,
  CASE2_HTML,
  CASE2_MATCHED,
} from "./extension.test.data";

suite("Extension Test Suite", () => {
  suiteTeardown(() => {
    vscode.window.showInformationMessage("All tests done!");
  });
  suite("extractMatchFromSelection", () => {
    test("case 1", () => {
      const result = extractMatchFromSelection(CASE1_HTML);
      assert.deepStrictEqual(result, CASE1_MATCHED);
    });
    test("case 2", () => {
      const result = extractMatchFromSelection(CASE2_HTML);
      assert.deepStrictEqual(result, CASE2_MATCHED);
    });
  });
  suite("tranformSelectionToCSS", () => {
    test("case 1", () => {
      const result = tranformSelectionToCSS(CASE1_MATCHED);
      assert.deepStrictEqual(result, CASE1_CSS);
    });
    test("case 2", () => {
      const result = tranformSelectionToCSS(CASE2_MATCHED);
      assert.deepStrictEqual(result, CASE2_CSS);
    });
  });
});
