import {IUploadQueryGenerator} from "../../core/Core/QueryGenerators/IUploadQueryGenerator";
import {IChunkUploadInitParameters} from "../../core/Core/Upload/ChunkUploadInitParameters";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import {IChunkUploadAppendParameters} from "../../core/Core/Upload/ChunkUploadAppendParameters";
import {ICustomRequestParameters} from "../../core/Public/Parameters/CustomRequestParameters";

export class UploadQueryGenerator implements IUploadQueryGenerator {
  public getChunkedUploadInitQuery(parameters: IChunkUploadInitParameters): string {
    let initQuery = new StringBuilder(Resources.Upload_URL);

    initQuery.addParameterToQuery(initQuery, "command", "INIT");
    initQuery.addParameterToQuery(initQuery, "media_type", parameters.mediaType);
    initQuery.addParameterToQuery(initQuery, "total_bytes", parameters.totalBinaryLength.toString(CultureInfo.InvariantCulture));
    initQuery.addParameterToQuery(initQuery, "media_category", parameters.mediaCategory);

    if (parameters.additionalOwnerIds != null && parameters.additionalOwnerIds.some(x => x)) {
      let ids: string = parameters.additionalOwnerIds.map(x => x.toString()).join(',');  // string.Join(",", parameters.additionalOwnerIds.map(x => x.toString()));
      initQuery.addParameterToQuery(initQuery, "additional_owners", ids);
    }

    initQuery.addFormattedParameterToQuery(parameters.customRequestParameters?.formattedCustomQueryParameters);

    return initQuery.toString();
  }

  public getChunkedUploadAppendQuery(parameters: IChunkUploadAppendParameters): string {
    if (parameters.mediaId === null) {
      throw new ArgumentNullException(`${nameof(parameters.mediaId)}", "APPEND Media Id cannot be null. Make sure you use the media id retrieved from the INIT query.`);
    }

    if (parameters.segmentIndex == null) {
      throw new ArgumentNullException(`${nameof(parameters.segmentIndex)}", "APPEND Segment index is required. Its initial value should be 0.`);
    }

    let appendQuery: StringBuilder = new StringBuilder(Resources.Upload_URL);

    appendQuery.addParameterToQuery(appendQuery, "command", "APPEND");
    appendQuery.addParameterToQuery(appendQuery, "media_id", parameters.mediaId/*.Value*/.toString(CultureInfo.InvariantCulture));
    appendQuery.addParameterToQuery(appendQuery, "segment_index", parameters.segmentIndex/*.Value*/.toString(CultureInfo.InvariantCulture));

    appendQuery.addFormattedParameterToQuery(parameters.customRequestParameters?.formattedCustomQueryParameters);

    return appendQuery.toString();
  }

  public getChunkedUploadFinalizeQuery(mediaId: number, customRequestParameters: ICustomRequestParameters): string {
    let finalizeQuery: StringBuilder = new StringBuilder(Resources.Upload_URL);

    finalizeQuery.addParameterToQuery(finalizeQuery, "command", "FINALIZE");
    finalizeQuery.addParameterToQuery(finalizeQuery, "media_id", mediaId.toString(CultureInfo.InvariantCulture));
    finalizeQuery.addFormattedParameterToQuery(customRequestParameters?.formattedCustomQueryParameters);

    return finalizeQuery.toString();
  }
}
