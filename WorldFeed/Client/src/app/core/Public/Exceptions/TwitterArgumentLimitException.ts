import ArgumentException from "src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";

// This exception is raised when you provide an invalid argument because of its size or content.
export class TwitterArgumentLimitException extends ArgumentException {
  constructor(argument: string, limitOrMessage: number | string, limitType: string, limitValueType: string) {
    if (typeof limitOrMessage === "string") {
      super(limitOrMessage, argument);
      this.limitType = limitType;
    } else {
      this.message = `Argument ${argument} was over the limit of ${limitOrMessage} ${limitValueType}`;
      this.paramName = argument;
      this.limitType = limitType;
    }
  }

  public message: string;   // override
  public paramName: string; // override
  public limitType: string;

  get note(): string {
    return `Limits can be changed in the client.Config.Limits.${this.limitType}`;
  }
}


//   public TwitterArgumentLimitException(argument: string, limit: number, limitType: string) : this(argument, limit, limitType, "items")
//   {
//   }
//
//   public TwitterArgumentLimitException(argument: string, limit: number, limitType: string, limitValueType: string)
//   {
//       Message = $"Argument {argument} was over the limit of {limit} {limitValueType}";
//       ParamName = argument;
//       LimitType = limitType;
//   }
//
//   public TwitterArgumentLimitException(argument: string, message: string, limitType: string) : base(message, argument)
//   {
//       LimitType = limitType;
//   }

