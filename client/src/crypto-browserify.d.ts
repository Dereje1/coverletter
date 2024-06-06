declare module 'crypto-browserify' {
    import { BinaryLike, CipherKey, Decipher, Cipher, CipherCCM, CipherGCM, DecipherGCM, DecipherCCM } from 'crypto';
  
    export function createCipher(algorithm: string, password: CipherKey): Cipher;
    export function createCipheriv(
      algorithm: string,
      key: CipherKey,
      iv: BinaryLike,
      options?: import('crypto').CipherCCMOptions | import('crypto').CipherGCMOptions
    ): CipherCCM | CipherGCM;
    export function createDecipher(algorithm: string, password: CipherKey): Decipher;
    export function createDecipheriv(
      algorithm: string,
      key: CipherKey,
      iv: BinaryLike,
      options?: import('crypto').CipherCCMOptions | import('crypto').CipherGCMOptions
    ): DecipherGCM | DecipherCCM;
    export function publicEncrypt(key: BinaryLike, buffer: Buffer): Buffer;
    export function privateDecrypt(key: BinaryLike, buffer: Buffer): Buffer;
  }
  