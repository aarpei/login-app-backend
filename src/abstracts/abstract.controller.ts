export abstract class ControllerAbstract<T> {
  abstract findAll(headers: Headers, response: Response): Promise<T[]>;
  abstract findByPropertie(
    headers: Headers,
    propetie: string,
    response: Response,
  ): Promise<T>;
  abstract create(headers: Headers, body: any, response: Response): Promise<T>;
  abstract delete(headers: Headers, id: number, response: Response): Promise<T>;
  abstract update(
    headers: Headers,
    id: number,
    body: any,
    response: Response,
  ): Promise<T>;
}
