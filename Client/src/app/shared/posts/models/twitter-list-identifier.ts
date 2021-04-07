// Identifier allowing to identify a unique list on Twitter.
export interface ITwitterListIdentifier {
  // Id of the list.
  id: number;

  // The short name of list or a category.
  // An owner id needs to be provided in addition to the Slug for a list identifier to be valid.
  slug: string;

  // Id of the users owning the list.
  // A slug needs to be provided in addition to the OwnerId for a list identifier to be valid.
  ownerId: number;

  // Screen name of the users owning the list.
  // A slug needs to be provided in addition to the OwnerScreenName for a list identifier to be valid.
  ownerScreenName: string;
}
