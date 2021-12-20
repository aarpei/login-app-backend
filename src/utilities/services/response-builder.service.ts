import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseBuilderService {
  private buildSuccesResponse = (response, status: HttpStatus, value?: any) => {
    return response.status(status).json(value);
  };

  private buildErrorResponse = (
    response,
    status: HttpStatus,
    errorMessage: string,
  ) => {
    return response.status(status).json({ errorMessage: `${errorMessage}` });
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
      .catch((error) =>
        this.buildErrorResponse(response, errorStatus, errorMessage),
      );
  };
}
