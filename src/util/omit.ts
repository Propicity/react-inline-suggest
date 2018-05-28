export function omit(obj: object, keys: string[]) {
  let target: object = {};

  for (let i in obj) {
    if (keys.indexOf(i) >= 0) {
      continue;
    }

    if (!obj.hasOwnProperty(i)) {
      continue;
    }

    target[i] = obj[i];
  }

  return target;
}
