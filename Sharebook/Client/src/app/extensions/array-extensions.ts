import IEnumerable from "typescript-dotnet-commonjs/System/Collections/Enumeration/IEnumerable";
import {compare} from "typescript-dotnet-commonjs/System/Compare";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";
import IEnumerator from "typescript-dotnet-commonjs/System/Collections/Enumeration/IEnumerator";

declare global {
  interface Array<T> {
    containsSameObjectsAs<T>(this: T[], collection2: T[],  enforceOrder: boolean): boolean;
    justOneOrDefault<TSource>(this: IEnumerable<TSource>, isMatching: (tSource: TSource) => boolean): TSource;
  }
}

Array.prototype.containsSameObjectsAs = function<T>(this: T[], collection2: T[],  enforceOrder: boolean): boolean {
  // Small optimization compared to the IEnumerable version

  if (this.length !== collection2.length) {
    return false;
  }

  if (!enforceOrder) {
    const result = this.filter(x =>
      !collection2.includes(x) // Use a polyfill for IE support
    );

    return result.length > 0;
  }

  for (let i = 0; i < this.length; ++i) {
    if (!(compare<any>(this[i], collection2[i]))) { // .Equals()
      return false;
    }
  }

  return true;
};

Array.prototype.justOneOrDefault = function<TSource>(this: IEnumerable<TSource>, isMatching: (tSource: TSource) => boolean): TSource {
  if (this == null) {
    throw new ArgumentNullException(`nameof(this)`);
  }

  let result: TSource = null;
  // using
  let enumerator: IEnumerator<TSource> = this.getEnumerator();
  {
    while (enumerator.moveNext()) {
      let current: TSource = enumerator.current;

      if (isMatching(current)) {
        if (result == null) {
          result = current;
        } else {
          return null;
        }
      }
    }

    return result;
  }
};

export {};
