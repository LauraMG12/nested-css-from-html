import * as assert from "assert";
import * as vscode from "vscode";

import {
  extractMatchFromSelection,
  findDynamicClass,
  findDynamicClassesIndex,
  tranformSelectionToCSS,
  transformDynamicClass,
  transformMultipleClasses,
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
  CASE3_CSS,
  CASE3_HTML,
  CASE3_MATCHED,
  CASE3_MULTICLASS_CSS,
  CASE3_MULTICLASS_HTML,
  CASE4_CLASSES,
  CASE4_CSS,
  CASE4_DYNAMIC_CLASS,
  CASE4_DYNAMIC_CLASS_ADAPTED,
  CASE4_HTML,
  CASE4_MATCHED,
} from "./extension.test.data";

/**
 * [X] CASE_1 -> nested single static classes
 * [x] CASE_2 -> static class with dynamic classes at the same level
 * [X] CASE_3 -> more than one static class at the same level
 * [X] CASE_4 -> dynamic class without static class at the same level
 */

suite("Extension Test Suite", () => {
  suiteTeardown(() => {
    vscode.window.showInformationMessage("All tests done!");
  });

  suite("CASE 1 -> nested single static classes", () => {
    test("Step 1: extractMatchFromSelection", () => {
      const result = extractMatchFromSelection(CASE1_HTML);
      assert.deepStrictEqual(result, CASE1_MATCHED);
    });
    test("Step 2: tranformSelectionToCSS", () => {
      const result = tranformSelectionToCSS(CASE1_MATCHED);
      assert.deepStrictEqual(result, CASE1_CSS);
    });
  });

  suite("CASE 2 -> static class with dynamic classes at the same level", () => {
    test("Step 1: extractMatchFromSelection", () => {
      const result = extractMatchFromSelection(CASE2_HTML);
      assert.deepStrictEqual(result, CASE2_MATCHED);
    });
    test("Step 2: tranformSelectionToCSS", () => {
      const result = tranformSelectionToCSS(CASE2_MATCHED);
      assert.deepStrictEqual(result, CASE2_CSS);
    });
    test("Step2.1.1: findDynamicClass", () => {
      const result = findDynamicClass(CASE2_DYNAMIC_CLASS);
      assert.deepStrictEqual(result, CASE2_DYNAMIC_CLASS);
    });
    test("Step 2.1: findDynamicClassesIndex", () => {
      const result = findDynamicClassesIndex(CASE2_CLASSES);
      assert.deepStrictEqual(result, [1]);
    });
    test("Step 2.2: transformDynamicClass", () => {
      const result = transformDynamicClass(CASE2_DYNAMIC_CLASS);
      assert.deepStrictEqual(result, CASE2_DYNAMIC_CLASS_ADAPTED);
    });
  });

  suite("CASE 3 -> more than one static class at the same level", () => {
    test("Step 1: extractMatchFromSelection", () => {
      const result = extractMatchFromSelection(CASE3_HTML);
      assert.deepStrictEqual(result, CASE3_MATCHED);
    });
    test("Step 2.1: transformMultipleClasses", () => {
      const result = transformMultipleClasses(CASE3_MULTICLASS_HTML);
      assert.deepStrictEqual(result, CASE3_MULTICLASS_CSS);
    });
    test("Step 2: tranformSelectionToCSS", () => {
      const result = tranformSelectionToCSS(CASE3_MATCHED);
      assert.deepStrictEqual(result, CASE3_CSS);
    });
  });

  suite(
    "CASE 4 -> dynamic class without static class at the same level",
    () => {
      test("Step 1: extractMatchFromSelection", () => {
        const result = extractMatchFromSelection(CASE4_HTML);
        assert.deepStrictEqual(result, CASE4_MATCHED);
      });
      test("Step 2: tranformSelectionToCSS", () => {
        const result = tranformSelectionToCSS(CASE4_MATCHED);
        assert.deepStrictEqual(result, CASE4_CSS);
      });
      test("Step2.1.1: findDynamicClass", () => {
        const result = findDynamicClass(CASE4_DYNAMIC_CLASS);
        assert.deepStrictEqual(result, CASE4_DYNAMIC_CLASS);
      });
      test("Step 2.1: findDynamicClassesIndex", () => {
        const result = findDynamicClassesIndex(CASE4_CLASSES);
        assert.deepStrictEqual(result, [0]);
      });
      test("Step 2.2: transformDynamicClass", () => {
        const result = transformDynamicClass(CASE4_DYNAMIC_CLASS);
        assert.deepStrictEqual(result, CASE4_DYNAMIC_CLASS_ADAPTED);
      });
    }
  );
});
