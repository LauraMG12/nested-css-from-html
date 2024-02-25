// CASE 1
export const CASE1_HTML = `
  <div class="class-1">
    <div class="class-2">
      <div class="class-3" />
    </div>
  </div>
  <div class="class-4"></div>
`;
export const CASE1_MATCHED: RegExpMatchArray = [
  'class="class-1"',
  'class="class-2"',
  'class="class-3"',
  "/>",
  "</div>",
  "</div>",
  'class="class-4"',
  "</div>",
];
export const CASE1_CSS = [
  ".class-1{",
  ".class-2{",
  ".class-3{}}}",
  ".class-4{}",
];

// CASE 2
export const CASE2_HTML = `
  <div class="class-1" :class="{class-2: condition, class-3:condition}" />
`;
export const CASE2_MATCHED: RegExpMatchArray = [
  'class="class-1"',
  'class="{class-2: condition, class-3:condition}"',
  "/>",
];
export const CASE2_CLASSES = [
  'class="class-1"',
  'class="{class-2: condition, class-3:condition}"',
  "/>",
];
export const CASE2_DYNAMIC_CLASS =
  'class="{class-2: condition, class-3:condition}"';
export const CASE2_DYNAMIC_CLASS_ADAPTED = "&.class-2{}&.class-3{}}";
export const CASE2_CSS = [".class-1{", "&.class-2{}&.class-3{}}"];
