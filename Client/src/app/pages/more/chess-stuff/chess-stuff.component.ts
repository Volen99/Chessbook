import {Component, OnDestroy, OnInit} from '@angular/core';

import {
  faUsers,
  faFrown,
} from '@fortawesome/pro-solid-svg-icons';


import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService
} from "../../../sharebook-nebular/theme/services/breakpoints.service";
import {NbThemeService} from "../../../sharebook-nebular/theme/services/theme.service";

export interface IQuote {
  name: string;
  text: string;

  one: string;
  two: string;
  three: string;
}

@Component({
  selector: 'app-chess-stuff',
  templateUrl: './chess-stuff.component.html',
  styleUrls: ['./chess-stuff.component.scss']
})
export class ChessStuffComponent implements OnInit, OnDestroy {

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit(): void {
    this.initializeQuotes();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  faUsers = faUsers;
  faFrown = faFrown;

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;


  quotes: IQuote[];

  private initializeQuotes() {
    this.quotes = [
      {
        name: 'Magnus Carlsen',
        text: 'Some people think that if their opponent plays a beautiful game, it’s OK to lose. I don’t. You have to be merciless.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Irving Chernev',
        text: 'Every chess master was once a beginner.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Vladimir Kramnik',
        text: 'If something defines his character, then it will also define his way of playing.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'Bill Hartston',
        text: 'Chess doesn’t drive people mad, it keeps mad people sane.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Bobby Fischer',
        text: 'I don’t believe in psychology. I believe in good moves.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'François-André Danican Philidor',
        text: 'Pawns are the soul of the game.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Nigel Short',
        text: 'Modern chess is too much concerned with things like pawn structure. Forget it, checkmate ends the game.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Aron Nimzowitsch',
        text: 'The passed pawn is a criminal, who should be kept under lock and key. Mild measures, such as police surveillance, are not sufficient.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Albert Einstein',
        text: 'Chess holds its master in its own bonds, shackling the mind and brain so that the inner freedom of the very strongest must suffer.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'José Raúl Capablanca',
        text: 'You may learn much more from a game you lose than from a game you win. You will have to lose hundreds of games before becoming a good player.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Savielly Tartakower',
        text: 'Tactics is knowing what to do when there is something to do; strategy is knowing what to do when there is nothing to do.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Mikhail Chigorin',
        text: 'Even a poor plan is better than no plan at all.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'Cecil Purdy',
        text: 'Pawn endings are to chess what putting is to golf.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Savielly Tartakower',
        text: 'Nobody ever won a chess game by resigning.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'Hans Ree',
        text: 'Chess is beautiful enough to waste your life for.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Nigel Short',
        text: 'If your opponent offers you a draw, try to work out why he thinks he’s worse off.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Savielly Tartakower',
        text: 'The blunders are all there on the board, waiting to be made.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Mikhail Tal',
        text: 'There are two types of sacrifices: correct ones, and mine.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'Mikhail Tal',
        text: 'When I asked Fischer why he had not played a certain move in our game, he replied: \'Well, you laughed when I wrote it down.\'.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Boris Spassky',
        text: 'We were like bishops of opposite color.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Emanuel Lasker',
        text: 'When you see a good move, look for a better one.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'Fred Reinfeld',
        text: 'The Pin is mightier than the sword.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Bobby Fischer',
        text: 'All I want to do, ever, is play chess.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'Max Euwe',
        text: 'Strategy requires thought, tactics require observation.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Wilhelm Steinitz',
        text: 'Only the player with the initiative has the right to attack.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Savielly Tartakower',
        text: 'Chess is a fairy tale of 1001 blunders.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Bobby Fischer',
        text: 'I give 98 percent of my mental energy to chess. Others give only 2 percent.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'Bobby Fischer',
        text: 'Tactics flow from a superior position.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Savielly Tartakower',
        text: 'The winner of the game is the player who makes the next-to-last mistake.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Emanuel Lasker',
        text: 'The hardest game to win is a won game.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'Wilhelm Steinitz',
        text: 'A sacrifice is best refuted by accepting it.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Siegbert Tarrasch',
        text: 'Many have become chess masters; no one has become the master of chess.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'Bobby Fischer',
        text: 'Your body has to be in top condition. Your chess deteriorates as your body does. You can’t separate body from mind.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Chinese Proverb',
        text: 'Life is like a game of Chess, changing with each move.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Purdy',
        text: 'Chess is as much a mystery as women.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Aron Nimzowitsch',
        text: 'Even the laziest king flees wildly in the face of a double check.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'Italian Proverb',
        text: 'After the game, the king and the pawn go into the same box.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Bobby Fischer',
        text: 'A strong memory, concentration, imagination, and a strong will is required to become a great Chess player.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Magnus Carlsen',
        text: 'I\'m not really into rap.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'Magnus Carlsen',
        text: 'It\'s nice to be financially secure. Apart from that, I really don\'t care too much about money.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Magnus Carlsen',
        text: 'I don\'t look at computers as opponents. For me it is much more interesting to beat humans.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'Paul Morphy',
        text: 'Help your pieces so they can help you.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Bobby Fischer',
        text: 'Best by test: 1.e4.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Bobby Fischer',
        text: 'Chess demands total concentration.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Anatoly Karpov',
        text: 'Chess is everything: art, science and sport.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'David Bronstein',
        text: 'Chess is imagination',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Magnus Carlsen',
        text: 'I get more upset at losing at other things than chess. I always get upset when I lose at Monopoly.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'George Eliot',
        text: 'It is never too late to be what you might have been.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'Hikaru Nakamura',
        text: 'In poker, you want to play the weaker guys. In chess, it\'s the opposite.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Hikaru Nakamura',
        text: 'In chess, everyone\'s accepted. That\'s what\'s great about it. You can be a little bit different. You can be an oddball.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'Hikaru Nakamura',
        text: 'I like the feeling when you don\'t have much time and you have to think fast.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Fabiano Caruana',
        text: 'You work for a long period of time and the results don\'t really show, but at some point everything just comes together and you start to play better, or get more confidence.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Paul Morphy',
        text: 'The ability to play chess is the sign of a gentleman. The ability to play chess well is the sign of a wasted life.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Garry Kasparov',
        text: 'Chess is mental torture.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'Garry Kasparov',
        text: 'Sometimes the best defence is the best defence.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Garry Kasparov',
        text: 'Don’t try to play the game that goes against your natural instincts.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Anatoly Karpov',
        text: 'Style? I have no style.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'Anatoly Karpov',
        text: 'To be champion requires more than simply being a strong player; one has to be a strong human being as well.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Indian Proverb',
        text: 'Chess is a sea in which a gnat may drink and an elephant may bathe.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'Mikhail Botvinnik',
        text: 'Chess is the art of analysis.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Isaac Asimov',
        text: 'In life, unlike chess the game continues after checkmate.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Garry Kasparov',
        text: 'If you wish to succeed, you must brave the risk of failure.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Judit Polgar',
        text: 'Without work, talent is lost.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'Judit Polgar',
        text: 'Being professional means 100% is not enough. Number one, two and three in my life was chess. The reality for women is, when a child comes into the picture, priorities change.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Bobby Fischer',
        text: 'I like the moment when I break a man\'s ego',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Walter Tevis',
        text: 'Chess isn\'t always competitive. Chess can also be beautiful.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'José Raúl Capablanca',
        text: 'A good player is always lucky.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Anand Viswanathan',
        text: 'Nowadays, when you’re not a grandmaster at 14, you can forget about it.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'Anand Viswanathan',
        text: 'For every door the computers have closed they have opened a new one.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Anand Viswanathan',
        text: 'I would never suggest to anyone that they drop school for chess. First of all even if you can make it in chess, your social skills need to be developed there.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Anand Viswanathan',
        text: 'Confidence is very important – even pretending to be confident. If you make a mistake but do not let your opponent see what you are thinking then he may overlook the mistake.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Anand Viswanathan',
        text: 'There is always the risk of being over-confident when you are preparing to face a weaker player.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'Anand Viswanathan',
        text: 'We want more women players to take up chess. There are few participants at the national level and hope it will grow.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Magnus Carlsen',
        text: 'This is a problem that’s been around in chess for a long time, chess societies have not been very kind to women and girls over the years. Certainly there needs to be a bit of a change in culture.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Hou Yifan',
        text: 'One thing which has been very important to my success is my mental mindset. I have a relatively positive and quiet one, and while I’m not the kind of person that spends 10 hours per day studying chess, when I do study, I can be fully concentrated for 4-5 hours, and I maximize that time.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'Hou Yifan',
        text: 'The deeper you go, you realize there’s more things you don’t know.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Siegbert Tarrasch',
        text: 'Chess is a terrible game. If you have no center, your opponent has a freer position. If you do have a center, then you really have something to worry about!.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'Fabiano Caruana',
        text: 'Probably they are a bit frustrated that they can\'t pick a draw against me.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Fabiano Caruana',
        text: 'When you feel confident you just play better more freely you don\'t question yourself don\'t think too long about if you are making the right decision.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Levon Aronian',
        text: 'Chess960 is healthy and good for your chess. If you get into it and not just move the pieces to achieve known positions it really improves your chess vision.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Levon Aronian',
        text: 'As a chess player one has to be able to control one\'s feelings, one has to be as cold as a machine.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'Boris Gelfand',
        text: 'The good thing in chess is that very often the best moves are the most beautiful ones. The beauty of logic.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Peter Leko',
        text: 'My favourite victory is when it is not even clear where my opponent made a mistake.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Siegbert Tarrasch',
        text: 'I have always a slight feeling of pity for the man who has no knowledge of Chess.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'Magnus Carlsen',
        text: 'I spend hours playing chess because I find it so much fun. The day it stops being fun is the day I give up.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Magnus Carlsen',
        text: 'Without the element of enjoyment, it is not worth trying to excel at anything.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'Judit Polgar',
        text: 'Chess demolishes differences. It\'s a language of different generations.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Anish Giri',
        text: 'I barely know what my plans are for tomorrow, but I hope chess will remain a major part of my life.',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Anish Giri',
        text: 'I have tremendous respect for my colleagues.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Anish Giri',
        text: 'I think chess players are not always what you think them to be. Or maybe it\'s our job to appear serious.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      {
        name: 'Jan Timman',
        text: 'Carlsen\'s repertoire is aimed at avoiding an early crisis in the game. He invariably aims for middlegames that lend themselves to a strategic approach.',
        one: 'heading',
        two: 'heading',
        three: 'text',
      },
      {
        name: 'Anish Giri',
        text: 'Magnus and I are very close in terms of style, but in our approach to the game we\'re total opposites. Magnus tries to put the accent only on play, getting away from preparation, but for me preparation plays an enormous role.',
        one: 'basic',
        two: 'body',
        three: 'basic',
      },
      {
        name: 'Anand Viswanathan',
        text: 'Magnus has an incredible innate sense. ... The majority of ideas occur to him absolutely naturally. He\'s also very flexible, he knows all the structures and he can play almost any position.',
        one: 'hint',
        two: 'hint',
        three: 'hint',
      },
      {
        name: 'David Levy',
        text: 'I prefer to lose a really good game than to win a bad one.',
        one: 'link',
        two: 'link',
        three: 'link',
      },
      {
        name: 'Evan Esar',
        text: 'Age brings wisdom to some men, and to others chess.',
        one: 'primary',
        two: 'status-primary',
        three: 'primary',
      },
      {
        name: 'French Proverb',
        text: 'You cannot play at chess if you are kind-hearted.',
        one: 'success',
        two: 'status-success',
        three: 'success',
      },
      {
        name: 'Stephan Gerzadowicz',
        text: 'Openings teach you openings. Endgames teach you chess!',
        one: 'info',
        two: 'status-info',
        three: 'info',
      },
      {
        name: 'Byron',
        text: 'Life is too short for chess.',
        one: 'warning',
        two: 'status-warning',
        three: 'warning',
      },
      {
        name: 'Vasily Smyslov',
        text: 'In chess, as in life, a man is his own most dangerous opponent.',
        one: 'danger',
        two: 'status-danger',
        three: 'danger',
      },
      // {
      //   name: 'Magnus Carlsen',
      //   text: 'Some people think that if their opponent plays a beautiful game, it’s OK to lose. I don’t. You have to be merciless.',
      //   one: 'heading',
      //   two: 'heading',
      //   three: 'text',
      // },
      // {
      //   name: 'Irving Chernev',
      //   text: 'Every chess master was once a beginner.',
      //   one: 'basic',
      //   two: 'body',
      //   three: 'basic',
      // },
      // {
      //   name: 'XXXXXX',
      //   text: 'YYYYYY.',
      //   one: 'hint',
      //   two: 'hint',
      //   three: 'hint',
      // },
      // {
      //   name: 'XXXXXX',
      //   text: 'YYYYYY.',
      //   one: 'link',
      //   two: 'link',
      //   three: 'link',
      // },
      // {
      //   name: 'XXXXXX',
      //   text: 'YYYYYY.',
      //   one: 'primary',
      //   two: 'status-primary',
      //   three: 'primary',
      // },
      // {
      //   name: 'XXXXXX',
      //   text: 'YYYYYY.',
      //   one: 'success',
      //   two: 'status-success',
      //   three: 'success',
      // },
      // {
      //   name: 'XXXXXX',
      //   text: 'YYYYYY.',
      //   one: 'info',
      //   two: 'status-info',
      //   three: 'info',
      // },
      // {
      //   name: 'XXXXXX',
      //   text: 'YYYYYY.',
      //   one: 'warning',
      //   two: 'status-warning',
      //   three: 'warning',
      // },
      // {
      //   name: 'XXXXXX',
      //   text: 'YYYYYY.',
      //   one: 'danger',
      //   two: 'status-danger',
      //   three: 'danger',
      // },
    ];

    this.quotes = this.quotes.sort(() => Math.random() - 0.5);
  }

}
