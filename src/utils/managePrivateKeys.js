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
    if (!wallet) {
      return;
    }

    if (!wallet.ENCRYPTED || !password) {
      return wallet.secret;
    }

    const bytes = AES.decrypt(wallet.SECRET, password);
    const decrypted = bytes.toString(enc.Utf8);

    if (!decrypted) {
      new Emitter().emitAll('WRONG_PASSWORD');
      return;
    }

    return decrypted;
  } catch (error) {
    new Emitter().emitAll('WRONG_PASSWORD');
  }
};
