export interface TreeItem {
    [key: string]: any;
    children?: TreeItem[];
}

type MapperFunction = (item: TreeItem) => any;

type KeyFunction = () => string;

/**
 * @description: tree转为list方法
 * @param {TreeItem} root 根节点对象
 * @param {MapperFunction} mapper 获取值的节点key或者转换方法
 * @return {*}
 */
export function treeToList(root: TreeItem, mapper?: MapperFunction) {
    if (root === null) return [];
    const nodes = [];
    const stack = [];
    stack.push(root);
    while (stack.length) {
        const cur = stack.pop() as TreeItem;
        const children = cur?.children;
        const transferObj = typeof mapper === 'function' ? mapper(cur) : cur;
        nodes.push(transferObj);
        if (children) {
            for (let i = children?.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }
    }
    return nodes;
}

function getKey(mapper?: string | KeyFunction, defaultKey = 'key') {
    if (typeof mapper === 'function') {
        return mapper();
    } else if (typeof mapper === 'string') {
        return mapper;
    } else {
        return defaultKey;
    }
}

/**
 * @description: tree转为分组对象，分组key为根节点的key
 * @param {TreeItem} root 根节点对象
 * @param {string | Function} childKeyValue 获取值的节点key或者转换方法
 * @param {string | Function} rootKeyValue 获取值的节点key或者转换方法,若不传，则使用childKeyValue的值
 * @param {Function} filter 过滤需要塞进列表的值
 * @return {*}
 */
export function treeToGroup(
    root: TreeItem,
    childKeyValue?: string | KeyFunction,
    rootKeyValue?: string,
    filter?: (value: unknown, option: TreeItem) => string | TreeItem | undefined
) {
    if (root === null) return [];
    const stack = [];
    // const result: Record<string, string[]> = {};
    const result: Array<string | string[]> = [];
    let count = 0;
    let rootKey = '';
    const key = getKey(rootKeyValue || childKeyValue);
    const childKey = getKey(childKeyValue);
    stack.push(root);
    while (stack.length) {
        count++;
        const cur = stack.pop() as TreeItem;
        const children = cur?.children;
        if (count === 1) {
            rootKey = cur[key];
            // result[rootKey] = [];
            result[0] = rootKey;
            result[1] = [];
        } else {
            const value =
                typeof filter === 'function'
                    ? filter(cur[childKey], cur)
                    : cur[childKey];
            // value && result[rootKey].push(value);
            value && (result[1] as string[]).push(value);
        }
        if (children) {
            for (let i = children?.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }
    }
    return result;
}

/**
 * @description: list转为tree
 * @param {TreeItem} items
 * @return {*}
 */
export function listToTree(items: TreeItem[]) {
    const result = []; // 存放结果集
    const itemMap: Record<number, any> = {}; //

    // 先转成map存储
    for (const item of items) {
        itemMap[item.id] = { ...item, children: [] };
    }

    for (const item of items) {
        const id = item.id;
        const pid = item.parent;
        const treeItem = itemMap[id];
        if (pid === null) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: []
                };
            }
            itemMap[pid].children.push(treeItem);
        }
    }
    return result;
}

export function traversalTree(
    data: TreeItem[],
    mapper: (item: TreeItem) => void
) {
    for (const item of data) {
        if (typeof mapper === 'function') {
            mapper(item);
        }
        if (item.children) {
            traversalTree(item.children, mapper);
        }
    }
    return data;
}
