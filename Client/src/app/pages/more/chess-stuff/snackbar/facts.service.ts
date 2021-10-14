import {Injectable} from "@angular/core";

@Injectable()
export class FactsService {
  private facts: string[] = [
    'Ra6!! bxa6 b7#',
    'Nf7+ Kg8 Nh6+ Kh8 Qg8+!! Rxg8 Nf7#',
    'Qh4#',
    'Qxc6+!! bxc6 Ba6#',
    'Nd6#',
    'Ne2+ Kh1 Qxh2+!! Kxh2 Rh6#',
    'Qd8+!! Kxd8 Bg5+ Kc7 (Ke8 Rd8#) Bd8#',
    'Glaciers and ice sheets hold about 69 percent of the world\'s freshwater',
    'The fastest gust of wind ever recorded on Earth was 253 miles per hour',
    'The best place in the world to see rainbows is in Hawaii 🌈',
    'The longest place name on the planet is 85 letters long',
    `Nxg7+ Kd8 Qf6+!! Nxf6 Be7# <img src="assets/images/emotes/emote-lit.png">`,
    `Qh6+!! Kxh6 (gxh6 Rxf7#) Rh8# <img src="assets/images/emotes/emote-magnus.png">`,
    `Bc5+ Kf1 Ng3+ Ke1 Bb4+ Kd1 Bb3+ Kc1 Ne2+ Kb1 Nc3+ Kc1 Rc2# <img src="assets/images/emotes/emote-fischer.jpg">`,
  ];

  fetchFacts() {
    return this.facts;
  }
}
