import {Component, OnInit} from '@angular/core';

import {TournamentService} from "../../../shared/shared-moderation/tournament-service";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {fallIn, moveIn} from "../../../router.animations";

export interface ITournament {
  name: string;
  description: string;
  picture: string;
  date: string;
  site: string;
  displayOrder: number;
  status: string;
  playerCount: number;
  twitter: string;
  facebook: string;
  youtube: string;
}

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
  animations: [moveIn(), fallIn()],
  // tslint:disable-next-line: use-host-property-decorator
  host: { '[@moveIn]': '' }

})
export class TournamentsComponent implements OnInit {

  constructor(private tournamentService: TournamentService,
              private notifier: NbToastrService) {
  }

  ngOnInit(): void {
    this.initializeTournaments();
  }

  tournaments: ITournament[] = [];

  private initializeTournaments() {
    this.tournamentService.listTournaments('public')
      .subscribe((data) => {
          this.tournaments = data.data;
        },
        err => this.notifier.danger(err.message, 'Error'));
  }
}
