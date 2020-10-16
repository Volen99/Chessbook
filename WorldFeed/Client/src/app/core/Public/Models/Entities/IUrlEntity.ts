import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";

// Information related with an URL in twitter
export interface IUrlEntity extends IEquatable<IUrlEntity> {
  // Real url
  URL: string;

  // Message displayed instead of the url
  displayedURL: string;

  // The fully resolved URL
  expandedURL: string;

  // The character positions the url was extracted from
  indices: number[];
}
