import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";

import {HttpService} from "../../core/backend/common/api/http.service";
import {RestExtractor} from "../../core/rest/rest-extractor";

@Injectable()
export class ContactService {
    constructor(private http: HttpService, private restExtractor: RestExtractor) {
    }

    sendMessage(fromEmail: string, fromName: string, subject: string, message: string) {
        const body = {
            fromEmail,
            fromName,
            subject,
            body: message
        };

        return this.http.post('common/contact', body)
            .pipe(catchError(res => this.restExtractor.handleError(res)));
    }
}
