import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

import {Champion, FemaleChampion} from "../../../../core/interfaces/iot/champion";

@Injectable()
export class WorldChampionsService {
  private contacts: Champion[] = [
    { name: 'Magnus Carlsen', picture: 'assets/images/magnus-carlsen.png', year: '2013–present', alpha2Code: 'no', title: 'Norway' },
    { name: 'Viswanathan Anand', picture: 'assets/images/vishy.jpg', year: '2007–2013', alpha2Code: 'in', title: 'India' },
    { name: 'Vladimir Kramnik', picture: 'assets/images/big-vlad.jpg', year: '2006–2007', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Veselin Topalov', picture: 'assets/images/vesko.jpg', year: '2005–2006 (FIDE)', alpha2Code: 'bg', title: 'Bulgaria' },
    { name: 'Rustam Kasimdzhanov', picture: 'assets/images/RK.jpeg', year: '2004-2005 (FIDE)', alpha2Code: 'uz', title: 'Uzbekistan' },
    { name: 'Ruslan Ponomariov', picture: 'assets/images/RP.jpg', year: '2002–2004 (FIDE)', alpha2Code: 'ua', title: 'Ukraine' },
    { name: 'Alexander Khalifman', picture: 'assets/images/khalifman.jpg', year: '1999–2000 (FIDE)', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Garry Kasparov', picture: 'assets/images/kasparov.jpg', year: '1985–1993 (undisputed) 1993–2000 (classical)', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Anatoly Karpov', picture: 'assets/images/karpov.jpg', year: '1975–1985, 1993–1999 (FIDE)', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Bobby Fischer', picture: 'assets/images/fischer.jpg', year: '1972–1975', alpha2Code: 'us', title: 'United States' },
    { name: 'Boris Spassky', picture: 'assets/images/spassky.jpeg', year: '1969–1972', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Tigran Petrosian', picture: 'assets/images/petrosian.png', year: '1963–1969', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Mikhail Tal', picture: 'assets/images/tal.jpg', year: '1960–1961', alpha2Code: 'lv', title: 'Latvia' },
    { name: 'Vasily Smyslov', picture: 'assets/images/smyslov.png', year: '1957–1958', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Mikhail Botvinnik', picture: 'assets/images/botvinik.jpg', year: '1948–1957, 1958–1960, 1961–1963', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Max Euwe', picture: 'assets/images/max-euwe.jpg', year: '1935–1937', alpha2Code: 'nl', title: 'Netherlands' },
    { name: 'Alexander Alekhine', picture: 'assets/images/alekhine.png', year: '1927–1935, 1937–1946,', alpha2Code: 'ru', title: 'Russia' },
    { name: 'José Raúl Capablanca', picture: 'assets/images/capablanca.jpg', year: '1921–1927', alpha2Code: 'cu', title: 'Cuba' },
    { name: 'Emanuel Lasker', picture: 'assets/images/lasker.jpg', year: '1894–1921', alpha2Code: 'de', title: 'Germany' },
    { name: 'Wilhelm Steinitz', picture: 'assets/images/steinitz.jpg', year: '1886–1894', alpha2Code: 'at', title: 'Austria' },
  ];

  private femaleChampions: FemaleChampion[] = [
    { name: 'Ju Wenjun', picture: 'assets/images/ju-wenjun.jpg', year: '2018–present', alpha2Code: 'cn', title: 'China' },
    { name: 'Tan Zhongyi', picture: 'assets/images/tan-zhongyi.jpg', year: '2017–2018', alpha2Code: 'cn', title: 'China' },
    { name: 'Hou Yifan', picture: 'assets/images/yifan.jpg', year: '2010–2012, 2016–2017', alpha2Code: 'cn', title: 'China' },
    { name: 'Mariya Muzychuk', picture: 'assets/images/mariya-muzychuk.jpg', year: '2015–2016', alpha2Code: 'ua', title: 'Ukraine' },
    { name: 'Anna Ushenina', picture: 'assets/images/ushenina.jpg', year: '2012–2013', alpha2Code: 'ua', title: 'Ukraine' },
    { name: 'Alexandra Kosteniuk', picture: 'assets/images/kosteniuk.jpeg', year: '2008–2010', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Xu Yuhua', picture: 'assets/images/yuhua.jpg', year: '2006–2008', alpha2Code: 'cn', title: 'China' },
    { name: 'Antoaneta Stefanova', picture: 'assets/images/eti.webp', year: '2006–2008', alpha2Code: 'bg', title: 'Bulgaria' },
    { name: 'Zhu Chen', picture: 'assets/images/zhu-chen.jpg', year: '2001–2004', alpha2Code: 'cn', title: 'China' },
    { name: 'Xie Jun', picture: 'assets/images/xie-jun.jpg', year: '1991-1996, 1999-2001', alpha2Code: 'cn', title: 'China' },
    { name: 'Susan Polgar', picture: 'assets/images/susan-polgar.jpg', year: '1996–1999', alpha2Code: 'hu', title: 'Hungary' },
    { name: 'Maia Chiburdanidze', picture: 'assets/images/chiburdanidze.jpg', year: '1978–1991', alpha2Code: 'ge', title: 'Georgia' },
    { name: 'Nona Gaprindashvili', picture: 'assets/images/gaprindashvili.webp', year: '1962–1978', alpha2Code: 'ge', title: 'Georgia' },
    { name: 'Elisaveta Bykova', picture: 'assets/images/bykova.jpeg', year: '1953–1956, 1958–1962', alpha2Code: 'ru', title: 'Russia' },
    { name: 'Lyudmila Rudenko', picture: 'assets/images/rudenko.jpg', year: '1958–1962', alpha2Code: 'ua', title: 'Ukraine' },
    { name: 'Vera Menchik', picture: 'assets/images/menchik.jpg', year: '1927–1944', alpha2Code: 'ua', title: 'Ukraine' },
  ];

  getChampions(): Observable<Champion[]> {
    return observableOf(this.contacts);
  }

  getFemaleChampions(): Observable<FemaleChampion[]> {
    return observableOf(this.femaleChampions);
  }

}
