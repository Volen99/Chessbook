import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {IPoll} from "../../shared/posts/models/poll/poll";
import {HttpClient} from "@angular/common/http";
import {SurveyService} from "../../shared/services/survey.service";
import { debounce } from 'lodash';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public poll: IPoll;
  @Input() public intl: any;
  @Input() public disabled: boolean = false;

  private _timer: any;

  constructor(private http: HttpClient, private surveyService: SurveyService, protected cd: ChangeDetectorRef) {
  }

  // componentWillReceiveProps (deprecated), getDerivedStateFromProps, componentWillUpdate, componentDidUpdate
  // can all be replaced by ngOnChanges in Angular.
  ngOnChanges(changes: SimpleChanges): any {
    this._setupTimer();

    const expires_at = this.poll.expiresAt;
    const expired = this.poll.expired || expires_at !== null && (new Date(expires_at)).getTime() < Date.now();
    // @ts-ignore
    return (expired === changes.expired) ? null : {expired};
  }

  ngOnInit(): void {
    if (!this.poll) {
      return null;
    }

    this.timeRemaining = this.expired ? 'Closed' : this.poll.expiresAt;
    this.showResults = this.poll.alreadyVoted || this.expired;

    if (this.poll.votersCount !== null && this.poll.votersCount !== undefined) {
      this.votesCount = this.poll.votersCount;
    } else {
      this.votesCount = this.poll.totalVotes;
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  // state
  selected = {};
  expired: any = null;


  pollVotesCount: number;
  percent: number;
  leading: any;
  active: boolean;
  voted: boolean;

  votesCount: any = null;

  alreadyVotedWarning = false;

  handleVote = () => {
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

  handleRefresh = () => {
    if (this.disabled) {
      return;
    }

   const refresh = debounce(
      () => {
        this.surveyService.getPoll(this.poll.id)
          .subscribe((data: IPoll) => {
            this.poll = data;
            this.votesCount = data.totalVotes;
          });
      },
      1000,
      { leading: true },
    );

    refresh();
  }

   timeRemaining: any;
   showResults: boolean;

  handleOptionChange = (value) => {  // { target: { value } }
    this._toggleOption(value);
  }

  setBackgroundColor = tmp => {
    this.selected = tmp;
  }

  private _toggleOption = value => {
    const tmp = {};
    tmp[value] = true;
    this.selected = tmp;
  }

  private _setupTimer() {
    clearTimeout(this._timer);
    if (!this.expired) {
      const delay = (new Date(this.poll.expiresAt)).getTime() - Date.now();
      this._timer = setTimeout(() => {
        this.expired = true;
      }, delay);
    }
  }
}
