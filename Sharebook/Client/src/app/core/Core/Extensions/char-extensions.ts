import Type from "typescript-dotnet-commonjs/System/Types";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";
import ArgumentOutOfRangeException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentOutOfRangeException";

export abstract class CharExtensions {
  /*================================= IsSurrogatePair ============================
 ** Check if the string specified by the index starts with a surrogate pair.
 ==============================================================================*/
   public static isSurrogatePair(sOrHighSurrogate: string, indexOrLowSurrogate: number | string): boolean {
    if (Type.isNumber(indexOrLowSurrogate)) {
      if (sOrHighSurrogate == null) {
        throw new ArgumentNullException("sOrHighSurrogate");
      }
      if (indexOrLowSurrogate < 0 || indexOrLowSurrogate >= sOrHighSurrogate.length) {
        throw new ArgumentOutOfRangeException(`nameof(indexOrLowSurrogate)`, indexOrLowSurrogate);
      }
      if (indexOrLowSurrogate + 1 < sOrHighSurrogate.length) {
        return (CharExtensions.isSurrogatePair(sOrHighSurrogate[indexOrLowSurrogate], sOrHighSurrogate[indexOrLowSurrogate + 1]));     // TODO: Beware! Recursion!!
      }

      return (false);
    }

    let highSurrogateWorkingVal = sOrHighSurrogate.charCodeAt(0);
    let lowSurrogateWorkingVal = indexOrLowSurrogate.charCodeAt(0);

    // Native methods to access the Unicode category data tables in charinfo.nlp.
    const HIGH_SURROGATE_START: string = '\ud800';
    const HIGH_SURROGATE_END: string = '\udbff';
    const LOW_SURROGATE_START: string = '\udc00';
    const LOW_SURROGATE_END: string = '\udfff';

    return ((highSurrogateWorkingVal >= HIGH_SURROGATE_START.charCodeAt(0) && highSurrogateWorkingVal <= HIGH_SURROGATE_END.charCodeAt(0)) &&
      (lowSurrogateWorkingVal >= LOW_SURROGATE_START.charCodeAt(0) && lowSurrogateWorkingVal <= LOW_SURROGATE_END.charCodeAt(0)));
  }
}
