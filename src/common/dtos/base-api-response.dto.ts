export class BaseApiSuccessResponse<T> {
  public success: boolean;
  public statusCode: number;
  public message: string;

  public data: T;
}
