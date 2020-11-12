
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";

// Attribute against an enum value from Twitter exposing it's JSON string equivelant
export class JsonEnumStringAttribute /*: Attribute*/ {
  constructor(jsonString: string) {
    if (jsonString) {
      this.jsonString = jsonString;
    } else {
      throw new ArgumentNullException(`nameof(jsonString)`);
    }
  }

  public readonly jsonString: string;
}
