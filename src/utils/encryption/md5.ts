import CryptoES from 'crypto-es';

export default (value: string): string => CryptoES.MD5(value).toString();
