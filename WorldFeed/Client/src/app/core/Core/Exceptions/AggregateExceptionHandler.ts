export interface ISingleAggregateExceptionThrower {
  executeActionAndThrowJustOneExceptionIfExist(action: () => void): void;
}

export class SingleAggregateExceptionThrower implements ISingleAggregateExceptionThrower {
  public executeActionAndThrowJustOneExceptionIfExist(action: () => void): void {
    try {
      action();
    } catch (aex) {
      if (aex.InnerException != null && aex.InnerExceptions.Count === 1) {
        let expectedExceptionType = aex.InnerExceptions[0];
        throw expectedExceptionType;
      }

      throw aex; // throw;
    }
  }
}
