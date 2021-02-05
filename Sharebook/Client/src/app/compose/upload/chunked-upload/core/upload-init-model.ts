export interface IUploadInitModel {
  mediaId: number;
  expiresAfterInSeconds: number;
}

export class UploadInitModel implements IUploadInitModel {
  // [JsonProperty("media_id")];
  public mediaId: number;

  // [JsonProperty("expires_after_secs")];
  public expiresAfterInSeconds: number;
}
