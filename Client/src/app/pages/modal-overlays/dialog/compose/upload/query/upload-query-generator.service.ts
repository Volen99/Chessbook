import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";

import {IChunkUploadInitParameters} from "../../../../../../shared/models/upload/chunk-upload-init-parameters";
import {IChunkUploadAppendParameters} from "../../../../../../shared/models/upload/chunk-upload-append-parameters";
import {ICustomRequestParameters} from "../../../../../../shared/models/query/custom-request-parameters";
import {RestService} from "../../../../../../core/rest/rest.service";

@Injectable()
export class UploadQueryGeneratorService {
  constructor(private restService: RestService) {

  }

  public getChunkedUploadInitQuery(parameters: IChunkUploadInitParameters): HttpParams {
    let initQuery = new HttpParams();

    initQuery = this.restService.addParameterToQuery(initQuery, "command", "INIT");
    initQuery = this.restService.addParameterToQuery(initQuery, "media_type", parameters.mediaType);
    initQuery = this.restService.addParameterToQuery(initQuery, "total_bytes", parameters.totalBinaryLength.toString(/*CultureInfo.InvariantCulture*/));
    initQuery = this.restService.addParameterToQuery(initQuery, "media_category", parameters.mediaCategory);

    if (parameters.additionalOwnerIds != null && parameters.additionalOwnerIds.some(x => x)) {
      let ids: string = parameters.additionalOwnerIds.map(x => x.toString()).join(',');  // string.Join(",", parameters.additionalOwnerIds.map(x => x.toString()));
      initQuery = this.restService.addParameterToQuery(initQuery, "additional_owners", ids);
    }

    initQuery = this.restService.addFormattedParameterToQuery(initQuery, parameters.customRequestParameters?.formattedCustomQueryParameters);

    return initQuery;
  }

  public getChunkedUploadAppendQuery(parameters: IChunkUploadAppendParameters): HttpParams {
    if (parameters.mediaId === null) {
      throw new Error(`${`nameof(parameters.mediaId)`}", "APPEND Media Id cannot be null. Make sure you use the media id retrieved from the INIT query.`);
    }

    if (parameters.segmentIndex == null) {
      throw new Error(`${`nameof(parameters.segmentIndex)`}", "APPEND Segment index is required. Its initial value should be 0.`);
    }

    let appendQuery = new HttpParams();

    appendQuery = this.restService.addParameterToQuery(appendQuery, "command", "APPEND");
    appendQuery = this.restService.addParameterToQuery(appendQuery, "media_id", parameters.mediaId/*.Value*/.toString(/*CultureInfo.InvariantCulture*/));
    appendQuery = this.restService.addParameterToQuery(appendQuery, "segment_index", parameters.segmentIndex/*.Value*/.toString(/*CultureInfo.InvariantCulture*/));

    appendQuery = this.restService.addFormattedParameterToQuery(appendQuery, parameters.customRequestParameters?.formattedCustomQueryParameters);

    return appendQuery;
  }

  public getChunkedUploadFinalizeQuery(mediaId: number, customRequestParameters: ICustomRequestParameters): HttpParams {
    let finalizeQuery = new HttpParams();

    finalizeQuery = this.restService.addParameterToQuery(finalizeQuery, "command", "FINALIZE");
    finalizeQuery = this.restService.addParameterToQuery(finalizeQuery, "media_id", mediaId.toString(/*CultureInfo.InvariantCulture*/));
    finalizeQuery = this.restService.addFormattedParameterToQuery(finalizeQuery, customRequestParameters?.formattedCustomQueryParameters);

    return finalizeQuery;
  }
}
