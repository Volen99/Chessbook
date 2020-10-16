import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IUserIdentifier} from "./Interfaces/IUserIdentifier";
import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// export interface IUserDictionary<T>
//     {
//          this[long userId]: T
//          this[string username]: T
//          this[IUserIdentifier index]: T
//     }


export interface IUserDictionary<T> {
  [userId: number]: T;

  [username: string]: T;

  [index: IUserIdentifier];
}

export class UserDictionary<T> implements IUserDictionary<T> {
  private readonly _userIdDictionary: Dictionary<string, T>;
  private readonly _usernameDictionary: Dictionary<string, T>;
  private readonly _userIdentifierDictionary: Dictionary<IUserIdentifier, T>;

  constructor() {
    this._userIdDictionary = new Dictionary<string, T>();
    this._usernameDictionary = new Dictionary<string, T>();
    this._userIdentifierDictionary = new Dictionary<IUserIdentifier, T>();
  }

  // public T this[long userId] => _userIdDictionary[userId.ToString(CultureInfo.InvariantCulture)];

  // [userId: IUserIdentifier]: T;

  get getValueByKey(key: number | string | IUserIdentifier): T {
    if (Type.isNumber(key)) {
      return this._userIdDictionary[key.toString(CultureInfo.InvariantCulture)];
    } else if (Type.isString(key)) {
      return this._usernameDictionary[key];
    } else {
      return this._userIdentifierDictionary[key];
    }
  }

  // public T this[string username] => _usernameDictionary[username];

  // public T this[IUserIdentifier index] => _userIdentifierDictionary[index];

  public AddOrUpdate(user: IUserIdentifier, element: T): void {
    this._userIdentifierDictionary.AddOrUpdate(user, element);

    if (user.id > 0) {
      this._userIdDictionary.AddOrUpdate(user.id.toString(CultureInfo.InvariantCulture), element);
    }

    if (user.idStr) {
      this._userIdDictionary.AddOrUpdate(user.idStr, element);
    }

    if (user.screenName != null) {
      this._usernameDictionary.AddOrUpdate(user.screenName, element);
    }
  }
}
