import * as assert from "assert";
import * as vscode from "vscode";

import {
  extractMatchFromSelection,
  findDynamicClass,
  findDynamicClassesIndex,
  tranformSelectionToCSS,
  transformDynamicClass,
} from "../extension.helper";
import {
  CASE1_CSS,
  CASE1_HTML,
  CASE1_MATCHED,
  CASE2_CLASSES,
  CASE2_CSS,
  CASE2_DYNAMIC_CLASS,
  CASE2_DYNAMIC_CLASS_ADAPTED,
  CASE2_HTML,
  CASE2_MATCHED,
} from "./extension.test.data";

/**
 * [X] CASE_1 -> nested single static classes
 * [x] CASE_2 -> static class with dynamic classes at the same level
 * [ ] CASE_3 -> more than one static class at the same level
 * [ ] CASE_4 -> dynamic class without static class at the same level
 */
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
  suite("findDynamicClass", () => {
    test("case 2", () => {
      const result = findDynamicClass(CASE2_DYNAMIC_CLASS);
      assert.deepStrictEqual(result, CASE2_DYNAMIC_CLASS);
    });
  });
  suite("findDynamicClassesIndex", () => {
    test("case 2", () => {
      const result = findDynamicClassesIndex(CASE2_CLASSES);
      assert.deepStrictEqual(result, [1]);
    });
  });
  suite("transformDynamicClass", () => {
    test("case 2", () => {
      const result = transformDynamicClass(CASE2_DYNAMIC_CLASS);
      assert.deepStrictEqual(result, CASE2_DYNAMIC_CLASS_ADAPTED);
    });
  });
});
