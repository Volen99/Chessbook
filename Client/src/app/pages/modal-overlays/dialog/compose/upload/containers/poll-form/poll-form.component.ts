import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-poll-form-option',
  template: ` <!--just got the idea for star wishes app 🌠 25.03.2021, Thursday, 19:55 PM | A Soulmate Who Wasnt Meant to Be-->
  <li>
      <label class="poll__option editable">
          <span class="poll__input" [ngClass]="{checkbox: this.isPollMultiple}"
                (click)="this.handleToggleMultiple"
                (keypress)="this.handleCheckboxKeypress"
                role='button'
                tabIndex='0'
                aria-label="Change poll to allow multiple choices">
          </span>
          <div class="autosuggest-input">
              <label>
                  <span style="display: none">this.placeholder</span>

                  <input nbInput type="text"
                         [placeholder]="'Choice ' + (this.index + 1)"
                         [attr.autoFocus]="this.autoFocus"
                         [value]="this.title"
                         (change)="this.handleOptionTitleChange($event)"
                         dir='auto'
                         maxLength="50"
                  />
              </label>
          </div>
      </label>

      <button nbButton ghost status="danger" class="poll__cancel" [disabled]="this.index <= 1"
              (click)="this.handleOptionRemove()">
          <nb-icon icon="close-outline"></nb-icon>
      </button>
  </li>
  `,
  styleUrls: ['./poll-form.component.scss']
})
export class OptionComponent implements OnInit {
  @Input() options: any[];
  @Input() title: string;
  @Input() index: number;
  @Input() isPollMultiple: boolean;
  @Input() autoFocus: boolean;
  @Input() onChange: (index: number, value: any) => any;
  @Input() onRemove: (index: number) => any;
  @Input() onToggleMultiple: (...params: any[]) => any;
  @Input() suggestions: any;
  @Input() onClearSuggestions: (...params: any[]) => any;
  @Input() onFetchSuggestions: (...params: any[]) => any;
  @Input() onSuggestionSelected: (...params: any[]) => any;

  ngOnInit(): void {
  }


  handleOptionTitleChange = e => {
    // this.onChange(this.index, e.target.value);
    this.options[this.index] = e.target.value;
  }

  handleOptionRemove = () => {
    this.options.splice(this.index, 1);
  };


  handleToggleMultiple = e => {
    this.onToggleMultiple();
    e.preventDefault();
    e.stopPropagation();
  };

  handleCheckboxKeypress = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.handleToggleMultiple(e);
    }
  };

  onSuggestionsClearRequested = () => {
    this.onClearSuggestions();
  };

  onSuggestionsFetchRequested = (token) => {
    this.onFetchSuggestions(token);
  };

  // @ts-ignore
  onSuggestionSelected = (tokenStart, token, value) => {
    this.onSuggestionSelected(tokenStart, token, value, ['poll', 'options', this.index]);
  };

}


@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit {
  @Input() options: any[];
  @Input() expiresIn: number;
  @Input() isMultiple: boolean;
  // @Input() onChangeOption: () => any;
  // @Input() onAddOption: (...params: any[]) => any;
  // @Input() onRemoveOption: () => any;
  // @Input() onChangeSettings: (...params: any[]) => any;
  @Input() suggestions: any;
  // @Input() onClearSuggestions: () => any;
  // @Input() onFetchSuggestions: () => any;
  // @Input() onSuggestionSelected: () => any;

  constructor() {
  }

  ngOnInit(): void {
    this.autoFocusIndex = this.options.indexOf('');
  }

  autoFocusIndex: number;


  handleAddOption = () => {
    this.onAddOption('');
  };

  handleSelectDuration = e => {
    this.onChangeSettings(e.target.value, this.isMultiple);
  };

  handleToggleMultiple = () => {
    // this.onChangeSettings(this.expiresIn, !this.isMultiple);
  };


  private onAddOption(title) {
    this.options.push(title);
  }

  onRemoveOption(index) {
    this.options.splice(index, 1);
  }

  onChangeOption(index, title) {
    this.options[index].title = title;
  }

  onChangeSettings(expiresIn, isMultiple) {
    this.expiresIn = expiresIn;
    this.isMultiple = isMultiple;
  }

  // onClearSuggestions () {
  //   dispatch(clearComposeSuggestions());
  // },
  //
  // onFetchSuggestions (token) {
  //   dispatch(fetchComposeSuggestions(token));
  // },
  //
  // onSuggestionSelected (position, token, accountId, path) {
  //   dispatch(selectComposeSuggestion(position, token, accountId, path));
  // },

}
