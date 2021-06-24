import { Observable } from 'rxjs';

export interface Champion {
  name: string;
  picture: string;
  year: string;
  alpha2Code: string;
  title: string;
}

export interface FemaleChampion extends Champion {
  // time: number;
}

export abstract class ChampionData {
  abstract getChampions(): Observable<Champion[]>;
  abstract getRecentUsers(): Observable<FemaleChampion[]>;
}
