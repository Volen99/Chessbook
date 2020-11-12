import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";
import IEnumerable from "typescript-dotnet-commonjs/System/Collections/Enumeration/IEnumerable";
import {Action} from "typescript-dotnet-commonjs/System/FunctionTypes";
import {DisplayLanguages} from "../../Public/Models/Enum/DisplayLanguages";

export abstract class DictionaryExtensions {
  public static tryAdd<T1, T2>(dictionary: Dictionary<T1, T2>, key: T1, value: T2): boolean {
    if (dictionary.containsKey(key)) {
      return false;
    }

    dictionary.addByKeyValue(key, value);

    return true;
  }

  public static addOrUpdate<T1, T2>(dictionary: Dictionary<T1, T2>, key: T1, value: T2): void {
    if (dictionary.containsKey(key)) {
      dictionary.setValue(key, value);
    } else {
      dictionary.addByKeyValue(key, value);
    }
  }

  public static forEach<T>(collection: IEnumerable<T>, action: Action<T>): void {
    for (let item in Object.keys(collection)) {
      if (collection[item] != null) {
        action(collection[item]);
      }
    }
  }

  // public static Dictionary<T1, T2> MergeWith<T1, T2>(this Dictionary<T1, T2> source, Dictionary<T1, T2> other)
  // {
  //     var dictionaries = new[] { source, other };
  //     return dictionaries.SelectMany(dict => dict)
  //            .ToLookup(pair => pair.Key, pair => pair.Value)
  //            .ToDictionary(group => group.Key, group => group.First());
  // }
}
