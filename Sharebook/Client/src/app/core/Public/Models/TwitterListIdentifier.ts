import {Inject, Injectable} from "@angular/core";

import {ITwitterListIdentifier} from "./Interfaces/ITwitterListIdentifier";
import {IUserIdentifier, IUserIdentifierToken} from "./Interfaces/IUserIdentifier";
import {UserIdentifier} from "./UserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

@Injectable({
  providedIn: 'root',
})
export class TwitterListIdentifier implements ITwitterListIdentifier {
  constructor(listIdOrSlug?: number | string,
              @Inject(IUserIdentifierToken) ownerIdOrScreenNameOrOwner?: number | string | IUserIdentifier) {
    if (TwitterListIdentifier.isIUserIdentifier(ownerIdOrScreenNameOrOwner)) {
      this.slug = listIdOrSlug as string;
      this.owner = ownerIdOrScreenNameOrOwner;
    } else {
      this.owner = new UserIdentifier();

      if (listIdOrSlug) {
        if (Type.isNumber(listIdOrSlug)) {
          this.id = listIdOrSlug;
        } else {
          this.slug = listIdOrSlug;
          this.owner = new UserIdentifier(ownerIdOrScreenNameOrOwner);
        }
      }
    }
  }

  public id: number;
  public slug: string;

  public owner: IUserIdentifier;

  get ownerId(): number {
    return this.owner?.id ?? 0;
  }

  get ownerScreenName(): string {
    return this.owner?.screenName;
  }

  private static isIUserIdentifier(ownerIdOrScreenNameOrOwner: number | string | IUserIdentifier): ownerIdOrScreenNameOrOwner is IUserIdentifier {
    return (ownerIdOrScreenNameOrOwner as IUserIdentifier)?.id !== undefined;
  }
}

// private TwitterListIdentifier()
// {
//   Owner = new UserIdentifier();
// }
//
// public TwitterListIdentifier(long listId) : this()
// {
//   Id = listId;
// }
//
// public TwitterListIdentifier(string slug, long ownerId) : this()
// {
//   Slug = slug;
//   Owner = new UserIdentifier(ownerId);
// }
//
// public TwitterListIdentifier(string slug, string ownerScreenName) : this()
// {
//   Slug = slug;
//   Owner = new UserIdentifier(ownerScreenName);
// }
//
// public TwitterListIdentifier(string slug, IUserIdentifier owner)
// {
//   Slug = slug;
//   Owner = owner;
// }
