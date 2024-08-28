import { isArray, isObject } from './is';

/**
 * @description: 移除对象中指定的key
 * @param {object} source
 * @param {Array} keys
 * @return {*}
 */
export function omit<T extends Record<string, any>, P extends keyof T>(
    source: T,
    keys: P[]
) {
    keys.forEach((key) => {
        delete source[key];
    });
    return source;
}

/**
 * @description: 获取对象中指定key的对象
 * @param {object} source
 * @param {Array} keys
 * @return {*}
 */
export function pick<T extends Record<string, any>, P extends keyof T>(
    source: T,
    keys: P[]
) {
    const target = {} as Pick<T, P>;
    keys.forEach((key) => {
        if (source[key] !== void 0) {
            target[key] = source[key];
        }
    });
    return target;
}

export function stringify(obj: object) {
    if (!isArray(obj) && !isObject(obj)) return;
    try {
        return JSON.stringify(obj);
    } catch {
        return isArray(obj) ? [] : {};
    }
}
