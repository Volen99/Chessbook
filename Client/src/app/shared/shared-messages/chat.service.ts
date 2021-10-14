import {Injectable} from '@angular/core';

import {messages} from './messages';
import {botReplies, gifsLinks, imageLinks} from './bot-replies';
import {HttpService} from "../../../core/backend/common/api/http.service";
import {HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {RestService} from "../../../core/rest/rest.service";
import {RestExtractor} from "../../../core/rest/rest-extractor";

@Injectable()
export class ChatService {

  constructor(private http: HttpService, private restService: RestService,
              private restExtractor: RestExtractor) {
  }

  loadMessages() {
    return messages;
  }

  loadBotReplies() {
    return botReplies;
  }

  reply(message: string) {
    const botReply: any = this.loadBotReplies()
      .find((reply: any) => message.search(reply.regExp) !== -1);

    if (botReply.reply.type === 'quote') {
      botReply.reply.quote = message;
    }

    if (botReply.type === 'gif') {
      botReply.reply.files[0].url = gifsLinks[Math.floor(Math.random() * gifsLinks.length)];
    }

    if (botReply.type === 'pic') {
      botReply.reply.files[0].url = imageLinks[Math.floor(Math.random() * imageLinks.length)];
    }

    if (botReply.type === 'group') {
      botReply.reply.files[1].url = gifsLinks[Math.floor(Math.random() * gifsLinks.length)];
      botReply.reply.files[2].url = imageLinks[Math.floor(Math.random() * imageLinks.length)];
    }

    botReply.reply.text = botReply.answerArray[Math.floor(Math.random() * botReply.answerArray.length)];
    return {...botReply.reply};
  }

  getAllPrivateMessagesAsync(tab: string) {
    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, 'tab', tab);

    let url = 'pm/index';
    return this.http.get(url, {params})
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }
}
