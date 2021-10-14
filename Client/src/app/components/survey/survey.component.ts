import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { debounce } from 'lodash';

import {IPoll} from "../../shared/posts/models/poll/poll";
import {environment} from "../../../environments/environment";
import {IPollOption} from "../../shared/posts/models/poll/poll-option";
import {SurveyService} from "../../shared/services/survey.service";
import {UserStore} from "../../core/stores/user.store";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnChanges {
  @Input() public poll: IPoll;
  @Input() public refresh: () => any;
  @Input() public onVote: () => any;

  private _timer: any;

  // private dateService: NbDateService<Date> -> just to remind to that there is such service kk..
  constructor(private http: HttpClient, private surveyService: SurveyService,
              protected cd: ChangeDetectorRef, private userStore: UserStore,
              private notifier: NbToastrService) {

  }

  ngOnInit(): void {
    this.timeRemaining = this.expired ? 'Closed' : this.poll.expiresAt;
    this.showResults = this.poll.alreadyVoted || this.expired;

    if (this.poll.votersCount !== null && this.poll.votersCount !== undefined) {
      this.votesCount = this.poll.votersCount;
    } else {
      this.votesCount = this.poll.totalVotes;
    }
  }

  alreadyVotedWarning = false;

  calcPercent(option: IPollOption) {
    this.percent = this.poll.totalVotes === 0 ? 0 : (option.numberOfVotes / this.poll.totalVotes) * 100;

    return Math.round(this.percent);
  }

  // componentWillReceiveProps (deprecated), getDerivedStateFromProps, componentWillUpdate, componentDidUpdate
  // can all be replaced by ngOnChanges in Angular.
  ngOnChanges(changes: SimpleChanges): any {
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
    if (!this.userStore.isLoggedIn()) {
      this.notifier.warning('', 'You need to be logged in to vote');
      return;
    }

    if (this.poll.alreadyVoted) {
      this.alreadyVotedWarning = true;
      return;
    }

    if (!this.selected) {
      return;
    }

    this.surveyService.vote(this.selected)
      .subscribe((data: IPoll) => {
        this.poll = data;

        this.poll.startDateUtc = new Date(data.startDateUtc);
        this.showResults = true;

        this.cd.detectChanges(); // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      });
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }

  handleRefresh = () => {
    debounce(
      () => {
        this.surveyService.getPoll(this.poll.id)
          .subscribe((data: IPoll) => {
            this.poll = data;
          });
      },
      1000,
      { leading: true },
    );
  }

  timeRemaining: any;
  showResults: boolean;

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


  // FIXME: you don't use this. You go here, assign {8: true}, but then it is just 8
  private _toggleOption = value => {
    const tmp = {};
    tmp[value] = true;
    this.selected = tmp;
  }

  // by mi

  handleShowResults() {
    this.showResults = !this.showResults;
    this.alreadyVotedWarning = false;
  }

  getOptionPercentage(percentOfTotalVotes: number) {
    return Math.round(percentOfTotalVotes);
  }
}
