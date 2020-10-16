import {CustomRequestParameters, ICustomRequestParameters} from "./CustomRequestParameters";

// A query that can return multiple times based on a cursor value
export interface ICursorQueryParameters extends ICustomRequestParameters {
  // The cursor value to start the operation with
  cursor: string;

  // The maximum number of objects to return
  pageSize: number;
}

export class CursorQueryParameters extends CustomRequestParameters implements ICursorQueryParameters {
  constructor(parameters?: ICursorQueryParameters) {
    if (parameters) {
      super(parameters);

      this.cursor = parameters.cursor;
      this.pageSize = parameters.pageSize;
    } else {
      super();

      this.cursor = null;
      this.pageSize = 20;
    }
  }

  public cursor: string;

  public pageSize: number;
}

// public CursorQueryParameters()
// {
//   Cursor = null;
//   PageSize = 20;
// }
//
// public CursorQueryParameters(parameters: ICursorQueryParameters) : base(parameters)
// {
//   if (parameters == null) { return; }
//
//   Cursor = parameters.Cursor;
//   PageSize = parameters.PageSize;
// }
