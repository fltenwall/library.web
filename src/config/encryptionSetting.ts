export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/**
 * 现在 不清楚 key 和 iv 值有什么关系, key设置成其他, 解密无法成功
 */

export const cacheCipher = {
  key: '1234567812345678',
  iv: '5685' // 初始向量
};
