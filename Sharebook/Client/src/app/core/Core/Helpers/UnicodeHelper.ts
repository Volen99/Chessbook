import StringBuilder from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {isSurrogatePair} from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Char";

export static class UnicodeHelper {
  // // Some versions of the .Net framework have this functionality built in. See StringInfo.SubstringByTextElements()
  // public static  SubstringByTextElements(str: string, startingTextElement: number): string {
  //     return UnicodeHelper.SubstringByTextElements(str, startingTextElement, str?.length ?? 0);
  // }

  public static substringByTextElements(str: string, startingTextElement: number, lengthInTextElements?: number = 0): string {
    if (str == null) {
      return null;
    }

    let textElements = StringInfo.GetTextElementEnumerator(str);
    let substr = new StringBuilder();
    let substrElementCount = 0;
    let i = 0;

    while (textElements.MoveNext()) {
      if (i >= startingTextElement && substrElementCount < lengthInTextElements) {
        substr.append(textElements.GetTextElement());
        substrElementCount++;
      }
      ++i;
    }

    return substr.toString();
  }

        public static AnyUnicode(str: string): boolean {
            for (let i = 0; i < str.length; ++i) {
                if (isSurrogatePair(str, i)) {
                    return true;
                }
            }

            return false;
        }

        // Get the UTF32 length of a string
        public static UTF32Length(this str: string): number;
        {
            if (str == null)
            {
                return 0;
            }

            return new StringInfo(str).LengthInTextElements;
        }
    }
