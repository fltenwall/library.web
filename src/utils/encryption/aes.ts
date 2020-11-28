/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoES from 'crypto-es'
// 加密还是有问题



export interface aesParams {
  key: string;
  iv: string;
}

class aes {

  private key

  private iv

  constructor({ key, iv }: aesParams) {

    this.key = CryptoES.enc.Utf8.parse(key)

    this.iv = CryptoES.enc.Utf8.parse(iv)
  }

  get getOption(): CryptoES.lib.CipherCfg {
    return {
      mode: CryptoES.mode.CBC as any,
      padding: CryptoES.pad.Pkcs7,
      iv: this.iv
    }
  }

  encrypt(str: string): string {
    const encrypted = CryptoES.AES.encrypt(str, this.key, this.getOption)
    return encrypted.toString()
  }

  decrypt(str: string): string {
    const decrypted = CryptoES.AES.decrypt(str, this.key, this.getOption)
    return decrypted.toString(CryptoES.enc.Utf8)
  }
}

export default aes