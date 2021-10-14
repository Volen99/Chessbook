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

    // this.tournaments = [
    //   {
    //     name: 'FIDE World Chess Championship 2021',
    //     description: 'The World Chess Championship 2021 will be a chess match between reigning world champion Magnus Carlsen and challenger Ian Nepomniachtchi to determine the World Chess Champion. It will be held under the auspices of FIDE, the world chess federation, and played in Dubai, United Arab Emirates, between 24 November and 16 December 2021.[1] The match was originally scheduled for the latter half of 2020, but was postponed until 2021 because of the COVID-19 pandemic.',
    //     picture: 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/NathanielGreen/phpajt3Ki.png',
    //     date: 'Nov 24, 2021 - Dec 16, 2021',
    //     site: 'https://twitter.com/volencho',
    //     twitter: 'https://twitter.com/volencho',
    //     facebook: 'https://twitter.com/volencho',
    //     youtube: 'https://twitter.com/volencho',
    //   },
    //   {
    //     name: 'Grand Chess Tour Sinquefield Cup 2021',
    //     description: 'A part of the inaugural Grand Chess Tour in 2015, the Sinquefield Cup will be the fifth and final leg of the 2021 Grand Chess Tour. Also held in the Chess Capital of the United States, this elite event will feature 10 of the strongest chess players in the world. Over the course of nine classical rounds, the competitors will battle for a $325,000 prize fund.',
    //     picture: 'https://images.chesscomfiles.com/uploads/v1/article/27149.945f4ff2.668x375o.e51533aa72fb@2x.png',
    //     date: 'Aug 16, 2021 - Aug 29, 2021',
    //     site: 'https://grandchesstour.org/2021-grand-chess-tour/2021-sinquefield-cup',
    //     twitter: 'https://grandchesstour.org/2021-grand-chess-tour/2021-sinquefield-cup',
    //     facebook: 'https://grandchesstour.org/2021-grand-chess-tour/2021-sinquefield-cup',
    //     youtube: 'https://grandchesstour.org/2021-grand-chess-tour/2021-sinquefield-cup',
    //   },
    // ];
  }
}
