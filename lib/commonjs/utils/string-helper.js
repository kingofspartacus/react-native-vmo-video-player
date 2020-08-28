"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTypeString = toTypeString;
exports.stringsOnlyObject = stringsOnlyObject;

function toTypeString(x) {
  switch (typeof x) {
    case 'object':
      return x instanceof Date ? x.toISOString() : JSON.stringify(x);

    case 'undefined':
      return '';

    default:
      return x.toString();
  }
}

function stringsOnlyObject(obj) {
  const strObj = {};
  Object.keys(obj).forEach(x => {
    strObj[x] = toTypeString(obj[x]);
  });
  return strObj;
}
//# sourceMappingURL=string-helper.js.map