import { AES, enc } from 'crypto-js';

export const encrypt = (secret, password) => {
  return AES.encrypt(secret, password).toString();
};

export const decrypt = (secret, password) => {
  try {
    const bytes = AES.decrypt(secret, password);
    return { success: true, data: bytes.toString(enc.Utf8) };
  } catch (error) {
    return { success: false };
  }
};
