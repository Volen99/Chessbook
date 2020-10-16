export class AsyncOperation<T> {
  constructor() {
    this.success = true;
  }

  public success: boolean;
  public result: T;
}

export class FailedAsyncOperation<T> extends AsyncOperation<T> {
  constructor() {
    super();
    super.success = false;
  }
}
