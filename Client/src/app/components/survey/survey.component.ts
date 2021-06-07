import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {IPoll} from "../../shared/posts/models/poll/poll";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IPollOption} from "../../shared/posts/models/poll/poll-option";
import {NbDateService} from 'app/sharebook-nebular/theme/components/calendar-kit/services/date.service';
import {Month} from "../../pages/my-account/my-account-settings/my-account-profile/my-account-profile.component";
import {SurveyService} from "../../shared/services/survey.service";

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

  constructor(private http: HttpClient, private surveyService: SurveyService, private dateService: NbDateService<Date>) {
  }

  ngOnInit(): void {
    this.timeRemaining = this.expired ? 'Closed :(' : this.poll.expires_at;
    this.showResults = this.poll.alreadyVoted || this.expired;
    this.disabled = false; // this.disabled || Object.entries(this.selected).every(item => !item);


    if (this.poll.votersCount !== null && this.poll.votersCount !== undefined) {
      this.votesCount = this.poll.votersCount;
    } else {
      this.votesCount = this.poll.totalVotes;
    }

    this._setupTimer();

  }

  alreadyVotedWarning = false;

  calcPercent(option: IPollOption) {
    this.percent = this.poll.totalVotes === 0 ? 0 : (option.numberOfVotes / this.poll.totalVotes) * 100;

    return Math.round(this.percent);
  }

  getNormalizedDate(date: Date) {
    return Month[(date.getUTCMonth() + 1)] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
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

    if (this.poll.alreadyVoted) {
      this.alreadyVotedWarning = true;

      return;
    }

    this.surveyService.vote(this.selected)
      .subscribe((data: IPoll) => {
        this.poll = data;

        this.poll.startDateUtc = new Date(data.startDateUtc);
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
  };

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
  };

  handleOptionKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this._toggleOption(e.target.getAttribute('data-index'));
      e.stopPropagation();
      e.preventDefault();
    }
  };


  private _toggleOption = value => {
    const tmp = {};
    tmp[value] = true;
    this.selected = tmp;
  };

  // by mi

  handleShowResults() {
    this.showResults = !this.showResults;
    this.alreadyVotedWarning = false;
  }

  getOptionPercentage(percentOfTotalVotes: number) {
    return Math.round(percentOfTotalVotes);
  }
}
