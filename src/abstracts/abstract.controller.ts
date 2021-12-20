export abstract class ControllerAbstract<T> {
  abstract findAll(response: Response): Promise<T[]>;
  abstract findByPropertie(propetie: string, response: Response): Promise<T>;
  abstract create(body: any, response: Response): Promise<T>;
  abstract delete(id: number, response: Response): Promise<T>;
  abstract update(id: number, body: any, response: Response): Promise<T>;
}
