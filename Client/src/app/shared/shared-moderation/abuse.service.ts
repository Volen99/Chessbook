import {omit} from 'lodash-es';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {RestService} from "../../core/rest/rest.service";
import {RestExtractor} from "../../core/rest/rest-extractor";
import {RestPagination} from "../../core/rest/rest-pagination";
import {ResultList} from "../models";
import {AdminAbuse, UserAbuse} from "../models/moderation/abuse/abuse.model";
import {AbuseCreate} from "../models/moderation/abuse/abuse-create.model";
import {AbuseUpdate} from "../models/moderation/abuse/abuse-update.model";
import {AbuseMessage} from "../models/moderation/abuse/abuse-message.model";
import {AbuseFilter} from "../models/moderation/abuse/abuse-filter.type";
import {AbusePredefinedReasonsString} from "../models/moderation/abuse/abuse-reason.model";
import {AbuseState} from "../models/moderation/abuse/abuse-state.model";
import {HttpService} from "../../core/backend/common/api/http.service";
import {SortMeta} from "primeng/api";

@Injectable()
export class AbuseService {
  private static BASE_ABUSE_URL = 'abuses';
  private static BASE_MY_ABUSE_URL = 'users/me/abuses';

  constructor(
    private authHttp: HttpService,
    private restService: RestService,
    private restExtractor: RestExtractor) {
  }

  getAdminAbuses(options: {
    pagination: RestPagination,
    sort: SortMeta,
    search?: string
  }): Observable<ResultList<AdminAbuse>> {
    const {pagination, sort, search} = options;
    const url = 'admin/' + AbuseService.BASE_ABUSE_URL;

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (search) {
      params = this.buildParamsFromSearch(search, params);
    }

    return this.authHttp.get<ResultList<AdminAbuse>>(url, {params})
      .pipe(
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  getUserAbuses(options: {
    pagination: RestPagination,
    sort: SortMeta,
    search?: string
  }): Observable<ResultList<UserAbuse>> {
    const {pagination, sort, search} = options;
    const url = AbuseService.BASE_MY_ABUSE_URL;

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (search) {
      params = this.buildParamsFromSearch(search, params);
    }

    return this.authHttp.get<ResultList<UserAbuse>>(url, {params})
      .pipe(
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  reportVideo(parameters: AbuseCreate) {
    const url = AbuseService.BASE_ABUSE_URL + '/report';

    const body = omit(parameters, ['id']);

    return this.authHttp.post(url, body)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  updateAbuse(abuse: AdminAbuse, abuseUpdate: AbuseUpdate) {
    const url = AbuseService.BASE_ABUSE_URL + '/' + abuse.id;

    return this.authHttp.put(url, abuseUpdate)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  removeAbuse(abuse: AdminAbuse) {
    const url = 'admin/' + AbuseService.BASE_ABUSE_URL + '/delete/' + abuse.id;

    return this.authHttp.delete(url)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  addAbuseMessage(abuse: UserAbuse, message: string) {
    const url = AbuseService.BASE_ABUSE_URL + '/' + abuse.id + '/messages';

    return this.authHttp.post(url, {message})
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  listAbuseMessages(abuse: UserAbuse) {
    const url = AbuseService.BASE_ABUSE_URL + '/' + abuse.id + '/messages';

    return this.authHttp.get<ResultList<AbuseMessage>>(url)
      .pipe(
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  deleteAbuseMessage(abuse: UserAbuse, abuseMessage: AbuseMessage) {
    const url = AbuseService.BASE_ABUSE_URL + '/' + abuse.id + '/messages/' + abuseMessage.id;

    return this.authHttp.delete(url)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  getPrefefinedReasons(type: AbuseFilter) {
    let reasons: { id: AbusePredefinedReasonsString, label: string, description?: string, help?: string }[] = [
      {
        id: 'violentOrRepulsive',
        label: `Violent or repulsive`,
        help: `Contains offensive, violent, or coarse language or iconography.`
      },
      {
        id: 'hatefulOrAbusive',
        label: `Hateful or abusive`,
        help: `Contains abusive, racist or sexist language or iconography.`
      },
      {
        id: 'spamOrMisleading',
        label: `Spam, ad or false news`,
        help: `Contains marketing, spam, purposefully deceitful news, or otherwise misleading <br/> thumbnail/text/tags. Please provide reputable sources to report hoaxes.`
      },
      {
        id: 'privacy',
        label: `Privacy breach or doxxing`,
        help: `Contains personal information that could be used to track, identify, contact or impersonate <br/> someone (e.g. name, address, phone number, email, or credit card details).`
      },
      {
        id: 'rights',
        label: `Copyright`,
        help: `Infringes your copyright wrt. the regional laws with which the server must comply.`
      },
      {
        id: 'serverRules',
        label: `Breaks server rules`,
        // was description
        help: `Anything not included in the above that breaks the terms of service, <br/> code of conduct, or general rules in place on the server.`
      }
    ];

    if (type === 'video') {
      reasons = reasons.concat([
        {
          id: 'thumbnails',
          label: `Thumbnails`,
          help: `The above can only be seen in thumbnails.`
        },
        {
          id: 'captions',
          label: `Captions`,
          help: `The above can only be seen in captions (please describe which).`
        }
      ]);
    }

    return reasons;
  }

  private buildParamsFromSearch(search: string, params: HttpParams) {
    const filters = this.restService.parseQueryStringFilter(search, {
      id: {prefix: '#'},
      state: {
        prefix: 'state:',
        handler: v => {
          if (v === 'accepted') return AbuseState.ACCEPTED;
          if (v === 'pending') return AbuseState.PENDING;
          if (v === 'rejected') return AbuseState.REJECTED;

          return undefined;
        }
      },
      videoIs: {
        prefix: 'videoIs:',
        handler: v => {
          if (v === 'deleted') return v;
          if (v === 'blacklisted') return v;

          return undefined;
        }
      },
      searchReporter: {prefix: 'reporter:'},
      searchReportee: {prefix: 'reportee:'},
      predefinedReason: {prefix: 'tag:'}
    });

    return this.restService.addObjectParams(params, filters);
  }
}
