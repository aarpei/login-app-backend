import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { ServiceAbstract } from '../../abstracts/abstract.service';

@Injectable()
export class CrudService<T> implements ServiceAbstract<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }
  async findByPropertie(properties: FindOneOptions): Promise<T> {
    return await this.repository.findOne(properties);
  }
  async create(newEntry: any): Promise<T> {
    const newInstance: T = newEntry as T;
    return await this.repository.save(newInstance);
  }
  async delete(id: number): Promise<any> {
    return await this.repository.delete(id);
  }
  async update(
    propertieObject: FindOneOptions,
    updatedEntity: any,
  ): Promise<T> {
    const oldData: T = (await this.repository.findOne(propertieObject)) ?? null;
    if (oldData !== null) {
      return await this.repository.save({
        ...oldData,
        ...updatedEntity,
      });
    }
    return null;
  }
}
