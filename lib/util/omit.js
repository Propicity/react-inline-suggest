"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function omit(obj, keys) {
    var target = {};
    for (var i in obj) {
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
exports.omit = omit;
//# sourceMappingURL=omit.js.map