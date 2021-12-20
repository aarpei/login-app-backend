import { FindOneOptions } from 'typeorm';

export abstract class ServiceAbstract<T> {
  abstract findAll(): Promise<T[]>;
  abstract findByPropertie(properties: FindOneOptions): Promise<T>;
  abstract create(newEntry: any): Promise<T>;
  abstract delete(id: number): Promise<T>;
  abstract update(
    propertieObject: FindOneOptions,
    updatedEntity: any,
  ): Promise<T>;
}
