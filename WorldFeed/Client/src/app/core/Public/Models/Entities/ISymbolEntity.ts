import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";

// https://dev.twitter.com/overview/api/entities-in-twitter-objects#symbols
export interface ISymbolEntity extends IEquatable<ISymbolEntity> {
  // Text containing the symbol
  text: string;

  // The symbol text start and end position
  indices: number[];
}
