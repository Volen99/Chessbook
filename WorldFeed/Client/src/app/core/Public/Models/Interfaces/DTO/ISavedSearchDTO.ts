import DateTime from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export interface ISavedSearchDTO {
  id: number;
  idStr: string;
  name: string;
  query: string;
  createdAt: DateTime; // DateTimeOffset;
}
