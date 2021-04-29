import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  faSearch = faSearch;

  svgStyles = {
    'padding-left': '10px',
    'color': 'rgb(110, 118, 125)',
    'display': 'inline-block',
    'fill': 'currentcolor',
    'height': '1.25em',
    'max-width': '100%',
    'min-width': '30px',
    'position': 'relative',
    'vertical-align': 'text-bottom',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
  };

}
