export interface IPageProcessingResult<TParent, TItem> {
  items: TItem[];
  associatedParentItems: TParent[];
}

export class MultiLevelPageProcessingResult<TParent, TItem> implements IPageProcessingResult<TParent, TItem> {
  public items: TItem[];
  public associatedParentItems: TParent[];
}
