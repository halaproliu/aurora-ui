const opt = Object.prototype.toString;

export function isArray(obj: any): obj is any[] {
    return opt.call(obj) === '[object Array]';
}

export function isObject(obj: any): obj is { [key: string]: any } {
    return opt.call(obj) === '[object Object]';
}

export function isString(obj: any): obj is string {
    return opt.call(obj) === '[object String]';
}

export function isNumber(obj: any): obj is number {
    return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}

export function isRegExp(obj: any) {
    return opt.call(obj) === '[object RegExp]';
}

export function isFile(obj: any): obj is File {
    return opt.call(obj) === '[object File]';
}

export function isBlob(obj: any): obj is Blob {
    return opt.call(obj) === '[object Blob]';
}

export function isUndefined(obj: any): obj is undefined {
    return obj === undefined;
}

export function isNull(obj: any): obj is null {
    return obj === null;
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
    return typeof obj === 'function';
}

export function isEmptyObject(obj: any): boolean {
    return isObject(obj) && Object.keys(obj).length === 0;
}

export function isExist(obj: any): boolean {
    return obj || obj === 0;
}

export function isWindow(el: any): el is Window {
    return el === window;
}

export function isSet(val: unknown): val is Set<any> {
    return opt.call(val) === '[object Set]';
}

export function isMap(val: unknown): val is Map<any, any> {
    return opt.call(val) === '[object Map]';
}

export function isEmpty(val: unknown) {
    if (val === null || val === void 0) return true;
    if (isArray(val)) return val.length === 0;
    if (isObject(val)) return Object.keys(val).length === 0;
    if (isSet(val) || isMap(val)) return val.size === 0;
}

export function isNil(val: unknown) {
    return val === null || val === void 0;
}

/**
 * @description: 判断字符串是否是时间戳
 * @param {string|number} str
 * @return {boolean}
 */
export function isTimestamp(val: string | number) {
    const transferVal: string = val.toString();
    const parsed = parseFloat(transferVal);
    return (
        !Number.isNaN(parsed) &&
        Number.isFinite(parsed) &&
        /^\d+\.?\d+$/.test(transferVal)
    );
}