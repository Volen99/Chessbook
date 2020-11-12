export abstract class EnumHelpers {
  /// <summary>
  /// Gets an enum field value that has an attribute meeting the supplied predicate
  /// </summary>
  /// <typeparam name="TEnum">The type of the enum you want a value from</typeparam>
  /// <typeparam name="TAttr">The type of the attribute you want to use to find the value</typeparam>
  /// <param name="attributePredicate">The predicate for testing candidate attributes</param>
  /// <param name="exceptionMessage">Optional - A custom exception message that will be used in the exception that is thrown if no value is found</param>
  /// <returns>The first value found that has an attribute matching the supplied predicate</returns>
  public static GetValueWhereAttribute<TEnum, TAttr>(attributePredicate: any, exceptionMessage: string): any {
    // if (this.TryGetValueWhereAttribute(attributePredicate, out TEnum val))
    // {
    //     return val;
    // }
    //
    // // Otherwise, we couldn't find a value of this enum that has an attribute matching the specified predicate
    // throw new ArgumentOutOfRangeException(exceptionMessage ?? "No attribute was found on the specfied enum type that matched the supplied predicate");
  }

  /// <summary>
  /// Try Get an enum field value that has an attribute meeting the supplied predicate
  /// </summary>
  /// <typeparam name="TEnum">The type of the enum you want a value from</typeparam>
  /// <typeparam name="TAttr">The type of the attribute you want to use to find the value</typeparam>
  /// <param name="attributePredicate">The predicate for testing candidate attributes</param>
  /// <param name="val">Used to return the value of the enum found. If no value is found, this will be the default</param>
  /// <returns>Whether a value was found</returns>
  public static TryGetValueWhereAttribute<T, Y>(attributePredicate: any): any {
    // if (attributePredicate == null)
    // {
    //     throw new ArgumentNullException(nameof(attributePredicate));
    // }
    //
    // foreach (var field in typeof(TEnum).GetFields())
    // {
    //     var attribute = field.GetCustomAttribute<TAttr>();
    //     if (attribute != null && attributePredicate(attribute))
    //     {
    //         val = (TEnum)field.GetValue(null);
    //         return true;
    //     }
    // }
    //
    // // If we get this far, we couldn't find a value of this enum that has an attribute matching the specified predicate
    // val = default(TEnum);
    // return false;
  }
}
