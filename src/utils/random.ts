/**
 * @description: 获取两数之间的随机数
 * @param {number} min
 * @param {number} max
 * @return {*}
 */
export function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function getRandomCryptoId() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(36);
}

/**
 * @description: 获取随机id
 * @return {*}
 */
export function getRandomId() {
    // 检测是否支持Web Crypto API
    if (window.crypto && window.crypto.subtle) {
        return getRandomCryptoId();
    }
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 10);
    return `${timestamp}_${random}`;
}
