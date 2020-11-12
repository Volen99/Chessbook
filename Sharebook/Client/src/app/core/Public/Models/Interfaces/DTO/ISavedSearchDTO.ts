import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export interface ISavedSearchDTO {
  id: number;
  idStr: string;
  name: string;
  query: string;
  createdAt: DateTime; // DateTimeOffset;
}
