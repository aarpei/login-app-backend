import * as bcrypt from 'bcrypt';

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
