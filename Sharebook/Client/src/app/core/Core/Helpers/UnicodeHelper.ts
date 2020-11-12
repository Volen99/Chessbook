import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {CharExtensions} from "../Extensions/char-extensions";

export abstract class UnicodeHelper {
  // Some versions of the .Net framework have this functionality built in. See StringInfo.SubstringByTextElements()
  // public static  SubstringByTextElements(str: string, startingTextElement: number): string {
  //     return UnicodeHelper.SubstringByTextElements(str, startingTextElement, str?.length ?? 0);
  // }

  public static substringByTextElements(str: string, startingTextElement: number, lengthInTextElements?: number): string {
    if (str == null) {
      return null;
    }

    let textElements = str.split('');       // StringInfo.GetTextElementEnumerator(str);
    let substr = new StringBuilder();
    let substrElementCount = 0;
    let i = 0;

    while (textElements[i] != null) {
      if (i >= startingTextElement && substrElementCount < lengthInTextElements) {
        substr.append(textElements[i]);
        substrElementCount++;
      }
      ++i;
    }

    return substr.toString();
  }

  public static anyUnicode(str: string): boolean {
    for (let i = 0; i < str.length; ++i) {
      if (CharExtensions.isSurrogatePair(str, i)) {
        return true;
      }
    }

    return false;
  }

  // Get the UTF32 length of a string
  public static UTF32Length(this: string): number {
    if (this == null) {
      return 0;
    }

    return this.length;        // new StringInfo(str).LengthInTextElements;
  }
}
