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
