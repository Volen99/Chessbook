import {Languages} from "../../Public/Models/Enum/Languages";
import {DisplayLanguages} from "../../Public/Models/Enum/DisplayLanguages";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";
import HashSet from "typescript-dotnet-commonjs/System/Collections/HashSet";
import Type from "typescript-dotnet-commonjs/System/Types";

// Attribute allowing to link a language with its Twitter code.
export class Language /*: Attribute*/ {
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
      throw new ArgumentException("You must specify a language code.", `nameof(codes)`);
    }
    if (!Type.isString(nameOrNames)) {
      if (nameOrNames == null || nameOrNames.length === 0) {
        throw new ArgumentException("You must specify a language name.", `nameof(nameOrNames)`);
      }

      this.name = nameOrNames[0];
      this.names = nameOrNames;
    } else {
      if (nameOrNames == null) {
        throw new ArgumentNullException(`nameof(nameOrNames)`);
      }

      if (nameOrNames.trim() === "") {
        throw new ArgumentException("Name must not be whitespace.", `nameof(nameOrNames)`);
      }

      this.name = nameOrNames;
      this.names = [nameOrNames]; // new[] { nameOrNames };
    }

    this.code = codes[0];
    this.codes = codes;
    this.hasMultipleCodes = codes.length > 1;
  }

  public getLanguageCode(this: Language /*| LanguageFilter*/): string {
    return this != null ? this.code : this.toString();
  }

  public getLangFromDescription(this: Language, descriptionValue: string): Language {
    try {
      if (this.isValidDescriptionField(descriptionValue)) {
        return this;    // (Language) language.GetValue(null);
      }

      if (descriptionValue) {
        let lessGenericLanguageCode = descriptionValue.substr(0, 2).toLocaleLowerCase();
        if (this.isValidDescriptionField(lessGenericLanguageCode)) {
          return this; //  (Language) language.GetValue(null);
        }
      }

      return Languages.Undefined;
    } catch (Exception) {
      return Languages.Undefined;
    }
  }

  private existingDisplayLanguages: HashSet<Language>;

  public static isADisplayLanguage(this: Language /*this Language? language*/): boolean {
    if (this == null) {
      return true;
    }

    // lock
    if (this.existingDisplayLanguages == null) {
      let languages = [];
      // tslint:disable-next-line:forin
      for (let currentLanguage in Object.keys(DisplayLanguages)) {
        languages.push(DisplayLanguages[currentLanguage]);
      }
      // this.existingDisplayLanguages = new HashSet<Language>(languages);

      return this.existingDisplayLanguages.contains(this);
    }
  }

  private isValidDescriptionField(this: Language, descriptionValue: string): boolean {
    if (!this.hasMultipleCodes) {
      return this.code === descriptionValue;
    }

    return this.codes.some(x => x === descriptionValue);
  }

  private static isNamesArray(nameOrNames: | string | string[]): nameOrNames is string[] {
    return (nameOrNames as string[])[0] !== undefined;
  }
}
