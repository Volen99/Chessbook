import {Component, Input, OnInit} from '@angular/core';

import {
  faGlobe,
} from '@fortawesome/pro-light-svg-icons';

import {
  faUsers,
} from '@fortawesome/pro-solid-svg-icons';


import {ITournament} from "../tournaments.component";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  @Input() tournament: ITournament;

  constructor() { }

  ngOnInit(): void {
  }

  faGlobe = faGlobe;
  faUsers = faUsers;

}
