import { isMap, isObject, isRegExp } from "./is";

interface GetDictsValueOptions<T> {
    labelKey?: keyof T;
    valueKey?: keyof T;
    defaultValue?: any;
}

/**
 * @description: 字典值翻译
 * @return {*}
 */
export function getDictsValue<T>(
    value: any,
    dicts: Array<T> | Map<any, any> | { [key: string]: any },
    options: GetDictsValueOptions<T> = {}
): any {
    const { labelKey = 'label', valueKey = 'value', defaultValue } = options;

    if (value == null) {
        return defaultValue ?? value;
    }

    if (Array.isArray(dicts)) {
        const item = dicts.find((dict) => {
            const dictValue = dict[valueKey as keyof T];
            if (isRegExp(dictValue)) {
                if ((dictValue as unknown as RegExp).test(value)) {
                    return dict[labelKey as keyof T];
                }
            } else if (dictValue === value) {
                return dict[labelKey as keyof T];
            }
        });

        if (item) {
            return item[labelKey as keyof T];
        } else {
            return defaultValue ?? value;
        }
    } else if (isMap(dicts)) {
        for (const [key, nextValue] of dicts.entries()) {
            if (isRegExp(key) && key.test(value)) {
                return nextValue;
            } else if (key === value) {
                return nextValue;
            }
        }
        return defaultValue;
    } else if (isObject(dicts)) {
        const keys = Object.keys(dicts);
        for (const key of keys) {
            const dictValue = dicts[key];
            if (isRegExp(dictValue)) {
                if (dictValue.test(value)) {
                    return dictValue;
                }
            } else if (key === value) {
                return dictValue;
            }
        }
    }

    return value ?? defaultValue;
}