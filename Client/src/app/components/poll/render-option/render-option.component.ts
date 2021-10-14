import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPoll} from "../../../shared/posts/models/poll/poll";
import {IPollOption} from "../../../shared/posts/models/poll/poll-option";

@Component({
  selector: 'app-render-option',
  templateUrl: './render-option.component.html',
  styleUrls: ['./render-option.component.scss']
})
export class RenderOptionComponent implements OnInit {
  @Input() option: IPollOption;
  @Input() optionIndex: number; // it is actually answer.id;
  @Input() showResults: any;

  @Input() poll: IPoll;
  @Input() disabled: boolean;

  // state
  @Output() selected = new EventEmitter<{}>();
  // @Input() selected = {};


  constructor() {
  }

  ngOnInit(): void {
    this.pollVotesCount = this.poll.votersCount || this.poll.totalVotes;
    // this.percent = this.pollVotesCount === 0 ? 0 : (this.option.votes_count / this.pollVotesCount) * 100;
    this.leading = this.poll.answers.filter(other => other.label === this.option.label).every(other => this.option.numberOfVotes >= other.numberOfVotes);
    this.active = !!this.selected[`${this.optionIndex}`];
    this.voted = (this.poll.ownVotes && this.poll.ownVotes.includes(this.option.id));
  }

  math: Math = Math;

  pollVotesCount: number;
  percent: number;
  leading: any;
  active: boolean;
  voted: boolean;

  handleOptionChange = ({ target: { value } }) => {
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
    if (this.poll.multiple) {
      const tmp = {...this.selected};
      if (tmp[value]) {
        delete tmp[value];
      } else {
        tmp[value] = true;
      }
      this.selected.emit(tmp);
    } else {
      /*const tmp = {};*/
      /*tmp[value] = true;*/
      this.selected.emit(+value);
    }
  }

  getOptionPercentage(percentOfTotalVotes: number) {
    return Math.round(percentOfTotalVotes);
  }
}
