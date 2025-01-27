export function stringArrayAddOrRemove(arr: string[], string: string) {
  if (arr.includes(string)) {
    return arr.toSpliced(arr.indexOf(string));
  } else {
    return arr.toSpliced(-1, 0, string);
  }
}
