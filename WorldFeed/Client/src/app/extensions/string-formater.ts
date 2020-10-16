import StringBuilder from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import Type from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import as = Type.as;

const UNRESERVED_CHARS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~";

declare global {
  interface String {
    urlEncode(this: string): string;
  }
}

String.prototype.urlEncode = function(): string {
  let result: StringBuilder = new StringBuilder();

  for (let char of this) {
    if (UNRESERVED_CHARS.includes(char.toString())) {
      result.append(char);
    } else {
      result.append('%' + `${ascii_to_hexadecimal(char)}`);
    }
  }

  return result.toString();
};

function ascii_to_hexadecimal(str) {
  let arr1 = [];
  for (let n = 0, l = str.length; n < l; n++) {
    let hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}

export {};
