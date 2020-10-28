import {ITwitterListIdentifier} from "./Interfaces/ITwitterListIdentifier";
import {IUserIdentifier, IUserIdentifierToken} from "./Interfaces/IUserIdentifier";
import {UserIdentifier} from "./UserIdentifier";
import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class TwitterListIdentifier implements ITwitterListIdentifier {
  constructor(@Inject(IUserIdentifierToken) listIdOrSlug?: number | string, ownerIdOrScreenNameOrOwner?: number | string | IUserIdentifier) {
    if (TwitterListIdentifier.isIUserIdentifier(ownerIdOrScreenNameOrOwner)) {
      this.slug = listIdOrSlug as string;
      this.Owner = ownerIdOrScreenNameOrOwner;
    } else {
      this.Owner = new UserIdentifier();

      if (listIdOrSlug) {
        if (Type.isNumber(listIdOrSlug)) {
          this.id = listIdOrSlug;
        } else {
          this.slug = listIdOrSlug;
          this.Owner = new UserIdentifier(ownerIdOrScreenNameOrOwner);
        }
      }
    }
  }

  public id: number;
  public slug: string;

  public Owner: IUserIdentifier;

  get ownerId(): number {
    return this.Owner?.id ?? 0;
  }

  get ownerScreenName(): string {
    return this.Owner?.screenName;
  }

  private static isIUserIdentifier(ownerIdOrScreenNameOrOwner: any): ownerIdOrScreenNameOrOwner is IUserIdentifier {
    return (ownerIdOrScreenNameOrOwner as IUserIdentifier).screenName !== undefined;
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
