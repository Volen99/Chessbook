import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {IPoll} from "../../shared/posts/models/poll/poll";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IPollOption} from "../../shared/posts/models/poll/poll-option";
import { NbDateService } from 'app/sharebook-nebular/theme/components/calendar-kit/services/date.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() public poll: IPoll;
  @Input() public intl: any;
  @Input() public disabled: boolean;
  @Input() public refresh: () => any;
  @Input() public onVote: () => any;

  private _timer: any;

  constructor(private http: HttpClient, private dateService: NbDateService<Date>) {
  }

  ngOnInit(): void {
    this.timeRemaining = this.expired ? 'Closed :(' : this.poll.expires_at;
    this.showResults   = this.poll.voted || this.expired;
    this.disabled      = false; // this.disabled || Object.entries(this.selected).every(item => !item);


    if (this.poll.voters_count !== null && this.poll.voters_count !== undefined) {
      this.votesCount = this.poll.voters_count;
    } else {
      this.votesCount = this.poll.votes_count;
    }

    this._setupTimer();

  }

  calcPercent(option: IPollOption) {
     this.percent = this.poll.votes_count === 0 ? 0 : (option.votes / this.poll.votes_count) * 100;

     return Math.round(this.percent);
  }

  getNormalizedDate(date: Date) {
    return date.getMonth() + ' ' + date.getFullYear();
  }

  ngAfterViewInit(): void {
    // this._setupTimer();
  }

  // componentWillReceiveProps (deprecated), getDerivedStateFromProps, componentWillUpdate, componentDidUpdate
  // can all be replaced by ngOnChanges in Angular.
  ngOnChanges(changes: SimpleChanges): any {
    this._setupTimer();

    const expires_at = this.poll.expires_at;
    const expired = this.poll.expired || expires_at !== null && (new Date(expires_at)).getTime() < Date.now();
    /// return (expired === changes.expired) ? null : {expired};
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  // state

  selected: {};
  expired: any = null;



  pollVotesCount: number;
  percent: number;
  leading: any;
  active: boolean;
  voted: boolean;


  votesCount: any = null;



  handleVote = () => {
    if (this.disabled) {
      return;
    }

    this.http.post(this.apiUrl + `/poll/vote/${this.selected}`, {})
        .subscribe((data) => {
          this.showResults = true;
        });
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }

  handleRefresh = () => {
    if (this.disabled) {
      return;
    }

    this.refresh();
  }

  timeRemaining: any;
  showResults: boolean;

  private _setupTimer() {
    clearTimeout(this._timer);
    if (!this.expired) {
      const delay = (new Date(this.poll.expires_at)).getTime() - Date.now();
      this._timer = setTimeout(() => {
        this.expired = true;
      }, delay);
    }
  }

  handleOptionChange = (value) => {  // { target: { value } }
    this._toggleOption(value);
  }

  handleOptionKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this._toggleOption(e.target.getAttribute('data-index'));
      e.stopPropagation();
      e.preventDefault();
    }
  }


  private _toggleOption = value => {
      const tmp = {};
      tmp[value] = true;
      this.selected = tmp;
  }

  // by mi

  handleShowResults() {
    this.showResults = !this.showResults;
  }
}
