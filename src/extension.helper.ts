export function extractMatchFromSelection(
  selectedText: string
): RegExpMatchArray | null {
  const pattern =
    /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]|<\/[^>]+>|\/>/gm;

  return selectedText.match(pattern);
}

export function tranformSelectionToCSS(match: RegExpMatchArray): string[] {
  return match
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
}
