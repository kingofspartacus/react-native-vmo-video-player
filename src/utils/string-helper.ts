export function toTypeString(x: any) {
  switch (typeof x) {
    case 'object':
      return x instanceof Date ? x.toISOString() : JSON.stringify(x);
    case 'undefined':
      return '';
    default:
      return x.toString();
  }
}

export function stringsOnlyObject(obj: any) {
  const strObj = {} as any;

  Object.keys(obj).forEach((x) => {
    strObj[x] = toTypeString(obj[x]);
  });

  return strObj;
}
