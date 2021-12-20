import { Injectable } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
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
    const newInstance: T = this.repository.create(newEntry as T);
    return await this.repository.save(newInstance);
  }
  async delete(id: number): Promise<any> {
    return await this.repository.delete(id);
  }
  async update(id: number, updatedEntity: any): Promise<T> {
    const oldData: T =
      (await this.repository.findOne({ where: { id: id } })) ?? null;
    if (oldData !== null) {
      return await this.repository.save({
        ...oldData,
        ...updatedEntity,
      });
    }
    //TODO: IMPLEMENT ERROR
    throw new HttpExceptionFilter();
  }
}
