import { DEFAULT_CACHE_TIME, cacheCipher } from '/@/config/encryptionSetting'
import { isString, isEmpty, isNumber } from '/@/utils/is'
import { stringify } from '/@/utils/stringify'
import aes from '/@/utils/encryption/aes'
import CryptoES from 'crypto-es'

export interface CreateStorage {
  set: (key: string, value: unknown) => void
  get: (key: string) => unknown
  remove: (key: string) => void
}

export const createStorage = ({ storage = sessionStorage } = {}): CreateStorage => {
  class WebStorage {
    private storage

    private encryption

    constructor() {
      // 设置数据库
      this.storage = storage
      // 设置加密方式
      this.encryption = new aes({ key: cacheCipher.key, iv: cacheCipher.iv })
    }

    // 获取 键
    private getKey(key: string): string {
      return CryptoES.MD5(key).toString()
    }

    // 设置 键值
    set(key: string, value: unknown, expire = DEFAULT_CACHE_TIME): void {
      // 有数据再进行缓存
      const result = stringify(value)
      if (isString(result)) {
        const stringData = stringify({ value, expire: new Date().getTime() + expire * 1000 }) as string
        const encrypted = this.encryption.encrypt(stringData)
        this.storage.setItem(this.getKey(key), encrypted)
      }
    }

    // 读取 键值
    get(key: string, def = null): unknown {
      const item = this.storage.getItem(this.getKey(key))
      if (item) {
        // 防止 item 不符合 JSON 格式
        try {
          const decrypted = this.encryption.decrypt(item)
          const { value, expire } = JSON.parse(decrypted)
          if (isEmpty(value) && isNumber(expire) && expire >= new Date().getTime()) {
            return value
          }
          throw 'value null'
        } catch (e) {
          return this.remove(key), def
        }
      }
      return def
    }

    // 删除 键值
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }
  }
  return new WebStorage()
}
