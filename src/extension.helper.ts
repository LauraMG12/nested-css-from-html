export function extractMatchFromSelection(
  selectedText: string
): RegExpMatchArray | null {
  const pattern =
    /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]|<\/[^>]+>|\/>/gm;

  return selectedText.match(pattern);
}

export function tranformSelectionToCSS(match: RegExpMatchArray): string[] {
  const cssClasses = match
    .map(
      (el) =>
        `${el
          .replace(/"/g, "")
          .replace("class=", "")
          .replace("className=", "")}`
    )
    .reduce((result: string[], currentValue: string): string[] => {
      const endTagPattern = /<\/[^>]+>|\/>/gm;
      if (currentValue.match(endTagPattern)) {
        result[result.length - 1] += `}`;
      } else {
        result.push(`.${currentValue}{`);
      }
      return result;
    }, []);

  const dynamicClass = findDynamicClassesIndex(cssClasses);
  if (dynamicClass) {
    cssClasses.map((item, index) => {
      if (dynamicClass.includes(index)) {
        cssClasses[index] = transformDynamicClass(item) ?? cssClasses[index];
      }
    });
  }

  cssClasses.map(
    (item, index) => (cssClasses[index] = transformMultipleClasses(item))
  );

  return cssClasses;
}

export function findDynamicClassesIndex(cssClasses: string[]): number[] {
  const dynamicClassIndex: number[] = [];

  cssClasses.forEach((item, index) => {
    const dynamicClass = findDynamicClass(item);

    if (dynamicClass) {
      dynamicClassIndex.push(index);
    }
  });

  return dynamicClassIndex;
}

export function findDynamicClass(item: string): string | undefined {
  const dynamicClassPattern = /(\[\[?|'{?|{\s*)/;
  return item.match(dynamicClassPattern)?.input;
}

export function transformDynamicClass(cssClass: string): string | undefined {
  const pattern = /\w+(?=:)/g;
  const dynamicClass = cssClass.match(pattern);
  if (dynamicClass) {
    return dynamicClass
      .map((match, index) => {
        if (index === dynamicClass.length - 1) {
          return `&.class-${match}{}}`;
        } else {
          return `&.class-${match}{}`;
        }
      })
      .join("");
  }
}

export function transformMultipleClasses(item: string): string {
  return item
    .split(" ")
    .map((cssClass, index, array) => {
      if (array.length === 1) {
        return cssClass;
      }
      if (index === 0) {
        return cssClass + "{}";
      }
      if (index === array.length - 1) {
        return "." + cssClass;
      } else {
        return "." + cssClass + "{}";
      }
    })
    .join(" ");
}
