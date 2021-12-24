import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import { environment } from 'environment/environment';

export const buildFindOneOptions = (propertie: string) => {
  const propertieSplit = propertie.split(':');
  const propertieObject = {};
  const objectFindOneOptions = {};
  Object.assign(propertieObject, { [propertieSplit[0]]: propertieSplit[1] });
  Object.assign(objectFindOneOptions, { where: propertieObject });
  return objectFindOneOptions;
};
export const crypt = async (value: string): Promise<string> => {
  return await hash(value);
};
const hash = async (value) => {
  return await bcrypt.hash(value, 10);
};

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(
    password.trim(),
    environment.criptography.passwordCryptoJS,
  ).toString();
};

export const decryptPassword = (password: string): string => {
  return CryptoJS.AES.decrypt(
    password.trim(),
    environment.criptography.passwordCryptoJS,
  ).toString(CryptoJS.enc.Utf8);
};
