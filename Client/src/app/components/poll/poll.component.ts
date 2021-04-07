import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {IPoll} from "../../shared/posts/models/poll/poll";

// const messages = defineMessages({
//   closed: { id: 'poll.closed', defaultMessage: 'Closed' },
//   voted: { id: 'poll.voted', defaultMessage: 'You voted for this answer', description: 'Tooltip of the "voted" checkmark in polls' },
// });

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() public poll: IPoll;
  @Input() public intl: any;
  @Input() public disabled: boolean;
  @Input() public refresh: () => any;
  @Input() public onVote: () => any;

  private _timer: any;

  constructor() {
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

    // @ts-ignore
    this.onVote(Object.keys(this.selected));
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
}
