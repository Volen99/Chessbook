import {Component, OnInit} from '@angular/core';
import {catchError} from "rxjs/operators";

import {HttpService} from "../../core/backend/common/api/http.service";
import {RestExtractor} from "../../core/rest/rest-extractor";
import {ResultList} from "../../shared/models";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";

export interface IDonator {
  name: string;
  link: string;
  message: string;
  type: string;
  col: number;
}

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  constructor(private http: HttpService, private restExtractor: RestExtractor, private notifier: NbToastrService) {
  }

  ngOnInit(): void {
    this.initializeDonations();
  }

  patrons: IDonator[] = [];
  kofis: IDonator[] = [];
  labs: IDonator[] = [];
  pals: IDonator[] = [];

  private initializeDonations() {

    this.http.get<ResultList<IDonator>>('donators/list')
      .pipe(catchError(err => this.restExtractor.handleError(err)))
      .subscribe((data) => {
        this.patrons = data.data.filter(d => d.type === 'patron');
        this.kofis = data.data.filter(d => d.type === 'kofi');
        this.labs = data.data.filter(d => d.type === 'lab');
        this.pals = data.data.filter(d => d.type === 'pal');
      }, err => this.notifier.danger(err.message, 'Error'));

  }

}
