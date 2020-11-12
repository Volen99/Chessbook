import {Injectable} from "@angular/core";

import {IUploadQueryGenerator} from "../../core/Core/QueryGenerators/IUploadQueryGenerator";
import {IChunkUploadInitParameters} from "../../core/Core/Upload/ChunkUploadInitParameters";
import {Resources} from "../../properties/resources";
import {IChunkUploadAppendParameters} from "../../core/Core/Upload/ChunkUploadAppendParameters";
import {ICustomRequestParameters} from "../../core/Public/Parameters/CustomRequestParameters";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";

@Injectable({
  providedIn: 'root',
})
export class UploadQueryGenerator implements IUploadQueryGenerator {
  public getChunkedUploadInitQuery(parameters: IChunkUploadInitParameters): string {
    let initQuery = new StringBuilder(Resources.Upload_URL);

    debugger
    StringBuilderExtensions.addParameterToQuery(initQuery, "command", "INIT");
    StringBuilderExtensions.addParameterToQuery(initQuery, "media_type", parameters.mediaType);
    StringBuilderExtensions.addParameterToQuery(initQuery, "total_bytes", parameters.totalBinaryLength.toString(/*CultureInfo.InvariantCulture*/));
    StringBuilderExtensions.addParameterToQuery(initQuery, "media_category", parameters.mediaCategory);

    if (parameters.additionalOwnerIds != null && parameters.additionalOwnerIds.some(x => x)) {
      let ids: string = parameters.additionalOwnerIds.map(x => x.toString()).join(',');  // string.Join(",", parameters.additionalOwnerIds.map(x => x.toString()));
      StringBuilderExtensions.addParameterToQuery(initQuery, "additional_owners", ids);
    }

    StringBuilderExtensions.addFormattedParameterToQuery(initQuery, parameters.customRequestParameters?.formattedCustomQueryParameters);

    return initQuery.toString();
  }

  public getChunkedUploadAppendQuery(parameters: IChunkUploadAppendParameters): string {
    if (parameters.mediaId === null) {
      throw new ArgumentNullException(`${`nameof(parameters.mediaId)`}", "APPEND Media Id cannot be null. Make sure you use the media id retrieved from the INIT query.`);
    }

    parameters.segmentIndex = 1; // TODO: DELETE
    if (parameters.segmentIndex == null) {
      throw new ArgumentNullException(`${`nameof(parameters.segmentIndex)`}", "APPEND Segment index is required. Its initial value should be 0.`);
    }

    let appendQuery: StringBuilder = new StringBuilder(Resources.Upload_URL);

    StringBuilderExtensions.addParameterToQuery(appendQuery, "command", "APPEND");
    StringBuilderExtensions.addParameterToQuery(appendQuery, "media_id", parameters.mediaId/*.Value*/.toString(/*CultureInfo.InvariantCulture*/));
    StringBuilderExtensions.addParameterToQuery(appendQuery, "segment_index", parameters.segmentIndex/*.Value*/.toString(/*CultureInfo.InvariantCulture*/));

    StringBuilderExtensions.addFormattedParameterToQuery(appendQuery, parameters.customRequestParameters?.formattedCustomQueryParameters);

    return appendQuery.toString();
  }

  public getChunkedUploadFinalizeQuery(mediaId: number, customRequestParameters: ICustomRequestParameters): string {
    let finalizeQuery: StringBuilder = new StringBuilder(Resources.Upload_URL);

    StringBuilderExtensions.addParameterToQuery(finalizeQuery, "command", "FINALIZE");
    StringBuilderExtensions.addParameterToQuery(finalizeQuery, "media_id", mediaId.toString(/*CultureInfo.InvariantCulture*/));
    StringBuilderExtensions.addFormattedParameterToQuery(finalizeQuery, customRequestParameters?.formattedCustomQueryParameters);

    return finalizeQuery.toString();
  }
}
