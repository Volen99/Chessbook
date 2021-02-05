

export interface IUploadMediaStatusQueryExecutor {
 // getMediaStatusAsync(media: IMedia, request: ITwitterRequest): Promise<ITwitterResult<IUploadedMediaInfo>>;
}


export class UploadMediaStatusQueryExecutor implements IUploadMediaStatusQueryExecutor {
  // private readonly _twitterAccessor: ITwitterAccessor;
  //
  // constructor(@Inject(ITwitterAccessorToken) twitterAccessor: ITwitterAccessor) {
  //   this._twitterAccessor = twitterAccessor;
  // }
  //
  // public async getMediaStatusAsync(media: IMedia, request: ITwitterRequest): Promise<ITwitterResult<IUploadedMediaInfo>> {
  //   if (!media.hasBeenUploaded) {
  //     throw new InvalidOperationException(Resources.Exception_Upload_Status_NotUploaded);
  //   }
  //
  //   if (media.uploadedMediaInfo.processingInfo == null) {
  //     throw new InvalidOperationException(Resources.Exception_Upload_Status_No_ProcessingInfo);
  //   }
  //
  //   request.query.url = `https://upload.twitter.com/1.1/media/upload.json?command=STATUS&media_id=${media.id}`;
  //   request.query.httpMethod = HttpMethod.GET;
  //
  //   return await this._twitterAccessor.executeRequestAsync<IUploadedMediaInfo>(request); // .ConfigureAwait(false);
  // }
}
