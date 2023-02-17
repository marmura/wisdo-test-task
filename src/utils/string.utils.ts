export function truncate(str: string, wordsCount: number) {
  return str.split(" ").splice(0, wordsCount).join(" ");
}

export function isWordsInString(str: string, searchList: string[]) {
  for (const item of searchList) {
    const index = str.toLowerCase().indexOf(item);
    if (index !== -1) {
      const prevChar = str.charAt(index - 1);
      const nextChar = str.charAt(index + item.length);

      if (!isLetter(prevChar) && !isLetter(nextChar)) {
        return false;
      }
    }
  }
  return true;
}

function isLetter(n: string) {
  return Boolean(n.match(/[a-zA-Z]/));
}
