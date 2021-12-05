import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {catchError} from "rxjs/operators";

import {HttpService} from "../../core/backend/common/api/http.service";
import {RestService} from "../../core/rest/rest.service";
import {RestExtractor} from "../../core/rest/rest-extractor";

@Injectable()
export class ChatService {

  removeMessageFromArrayEvent: Subject<any> = new Subject();

  constructor(private http: HttpService, private restService: RestService,
              private restExtractor: RestExtractor) {
  }

  getAllPrivateMessagesAsync(tab: string) {
    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, 'tab', tab);

    let url = 'pm/index';
    return this.http.get(url, {params})
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }

  send(toCustomerId: number, replyToMessageId: number, subject: string, message: string) {
    const body = {
      toCustomerId,
      replyToMessageId,
      subject,
      message: message,
    };

    return this.http.post('pm/send', body)
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }

  loadMessage(messageId: number) {
    return this.http.get(`pm/view-pm/${messageId}`)
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }

  getUnreadPrivateMessages() {
    return this.http.get('pm/unread')
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }

  delete(id: number, tab: string) {
    this.removeMessageFromArrayEvent.next([+id, tab]);
    return this.http.post(`pm/delete-${tab}/${id}`, {})
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }


}
