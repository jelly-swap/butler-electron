import { AES, enc } from 'crypto-js';

export const encrypt = (secret, password) => {
  return new Promise((resolve, reject) => {
    try {
      const result = AES.encrypt(secret, password).toString();
      resolve(result);
    } catch (err) {
      return reject(err);
    }
  });
};

export const decrypt = (secret, password) => {
  return new Promise((resolve, reject) => {
    try {
      const bytes = AES.decrypt(secret, password);
      return resolve({ success: true, data: bytes.toString(enc.Utf8) });
    } catch (error) {
      return reject({ success: false });
    }
  });
};
