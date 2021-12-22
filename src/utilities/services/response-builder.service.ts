import { HttpStatus, Injectable } from '@nestjs/common';
import { encryptPassword } from '../Utils';

@Injectable()
export class ResponseBuilderService {
  private buildSuccesResponse = (response, status: HttpStatus, value?: any) => {
    if (value?.password) {
      value.password = encryptPassword(value.password);
    }
    return response.status(status).json(value);
  };

  public buildErrorResponse = (
    response,
    status: HttpStatus,
    errorMessage: string,
  ) => {
    return response.status(status).json({ message: `${errorMessage}` });
  };

  public buildPromiseResponse = (
    promise: Promise<any>,
    response,
    succesStatus: HttpStatus,
    errorStatus: HttpStatus,
    errorMessage: string,
  ) => {
    return promise
      .then((value) => this.buildSuccesResponse(response, succesStatus, value))
      .catch((error) => {
        this.buildErrorResponse(response, errorStatus, errorMessage);
      });
  };
}
