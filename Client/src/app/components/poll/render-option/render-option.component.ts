import {Component, Input, OnInit} from '@angular/core';
import {IPoll} from "../../../shared/posts/models/poll/poll";

@Component({
  selector: 'app-render-option',
  templateUrl: './render-option.component.html',
  styleUrls: ['./render-option.component.scss']
})
export class RenderOptionComponent implements OnInit {
  @Input() option: any;
  @Input() optionIndex: number;
  @Input() showResults: any;

  @Input() poll: IPoll;
  @Input() disabled: boolean;

  // state
  @Input() selected: { };


  constructor() {
  }

  ngOnInit(): void {
    this.pollVotesCount = this.poll.votersCount || this.poll.votesCount;
    this.percent = this.pollVotesCount === 0 ? 0 : (this.option.votes_count / this.pollVotesCount) * 100;
    this.leading = this.poll.options.filter(other => other.label === this.option.title).every(other => this.option.votes_count >= other.votes);
      /*this.active = !!this.selected[`${this.optionIndex}`];*/
    this.voted = this.option.voted || (this.poll.ownVotes && this.poll.ownVotes.includes(this.optionIndex));
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
      this.selected = tmp;
    } else {
      const tmp = {};
      tmp[value] = true;
      this.selected = tmp;
    }
  }
}
