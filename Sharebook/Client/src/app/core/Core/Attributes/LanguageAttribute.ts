import ArgumentNullException from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException";
import ArgumentException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException';

// Attribute allowing to link a language with its Twitter code.
export class LanguageAttribute /*: Attribute*/ {
  // Name of the language in English.
  public name: string;

  // Language names also reference by the code.
  public names: string[];

  // Primary language code.
  public code: string;

  // All available language codes.
  public codes: string[];

  // Does Twitter represent this language with different codes.
  public hasMultipleCodes: boolean;

  constructor(nameOrNames: string | string[], ...codes: string[]) {
    if (codes == null || codes.length === 0) {
      throw new ArgumentException("You must specify a language code.", nameof(codes));
    }

    if (LanguageAttribute.isNamesArray(nameOrNames)) {
      if (nameOrNames == null || nameOrNames.length === 0) {
        throw new ArgumentException("You must specify a language name.", nameof(nameOrNames));
      }

      this.name = nameOrNames[0];
      this.names = nameOrNames;
    } else {
      if (nameOrNames == null) {
        throw new ArgumentNullException(nameof(nameOrNames));
      }

      if (nameOrNames.trim() === "") {
        throw new ArgumentException("Name must not be whitespace.", nameof(nameOrNames));
      }

      this.name = nameOrNames;
      this.names = [nameOrNames]; // new[] { nameOrNames };
    }

    this.code = codes[0];
    this.codes = codes;
    this.hasMultipleCodes = codes.length > 1;
  }

  private static isNamesArray(nameOrNames: | string | string[]): nameOrNames is string[] {
    return (nameOrNames as string[])[0] !== undefined;
  }
}
