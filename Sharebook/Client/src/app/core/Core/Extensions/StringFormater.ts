import StringBuilder from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";

export class StringFormatter {
  private static readonly UNRESERVED_CHARS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~";

  // Clean a string so that it can be used in an URL
  // <param name="str">string to clean</param>
  // <returns>Cleaned string that can be added into an URL</returns>
  public static urlEncode(str: string): string {
    let result: StringBuilder = new StringBuilder();

    for (let char of str) {
      if (StringFormatter.UNRESERVED_CHARS.includes(char.toString())) {
        result.append(char);
      } else {
        result.append('%' + `${StringFormatter.ascii_to_hexadecimal(char)}`);
      }
    }

    return result.toString();
  }

  private static ascii_to_hexadecimal(str: string) {
    let arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
      let hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }

    return arr1.join('');
  }
}
