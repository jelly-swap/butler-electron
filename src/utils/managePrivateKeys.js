import { AES, enc } from 'crypto-js';

export const encryptPrivateKeys = (secret, password) => {
  if (!secret) {
    return '';
  }

  const encrypted = AES.encrypt(secret, password).toString();

  return encrypted;
};

export const decryptPrivateKey = (secret, password) => {
  try {
    const bytes = AES.decrypt(secret, password);
    const decrypted = bytes.toString(enc.Utf8);

    if (!decrypted) {
      return;
    }

    return decrypted;
  } catch (error) {
    console.log(error);
  }
};
