import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";

// A hashtag is a keyword prefixed by # and representing a category of tweet
export interface IHashtagEntity extends IEquatable<IHashtagEntity> {
  // HashTag name
  text: string;

  // The character positions the Hashtag was extracted from
  indices: number[];
}
