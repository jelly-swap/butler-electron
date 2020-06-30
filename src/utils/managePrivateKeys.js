import { AES, enc } from 'crypto-js';
import Emitter from './emitter';

export const encryptPrivateKeys = (secret, password) => {
  if (!secret) {
    return '';
  }

  const encrypted = AES.encrypt(secret, password).toString();

  return encrypted;
};

export const decryptPrivateKey = (wallet, password) => {
  try {
    if (!wallet.ENCRYPTED) {
      return wallet.SECRET;
    }

    const bytes = AES.decrypt(wallet.SECRET, password);
    const decrypted = bytes.toString(enc.Utf8);

    if (!decrypted) {
      new Emitter().emitAll('WRONG_PASSWORD');
      return;
    }

    new Emitter().emitAll('SUCCESS_PASSWORD');

    return decrypted;
  } catch (error) {
    new Emitter().emitAll('WRONG_PASSWORD');
  }
};
