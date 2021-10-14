import {Component, OnInit} from '@angular/core';

import {
  faHeart,
} from '@fortawesome/pro-light-svg-icons';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  animations: [
    trigger('photosAnimation', [
      transition('inactive => active', [
        query(':self',style({ transform: 'scale(1.0)'})),
        query(':self',
          stagger('0ms linear', [
            animate('150ms linear', style({ transform: 'scale(1.5)'}))
          ]))
      ])
    ])
  ]
})
export class TermsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

//   public animateHeart($elem, start, end, complete) {
//     $elem.stop().css("textIndent", start).animate({
//       textIndent: end
//     }, {
//       complete: complete,
//       step: function step(now) {
//         $(this).css("transform", "scale(" + now + ")").addClass("d-liked").removeClass("d-unliked");
//       },
//       duration: 150
//     }, "linear");
//   }
//
//   var $heart = $("[data-post-id=".concat(attrs.id, "] .toggle-like .d-icon"));
//   $heart.closest("button").addClass("has-like");
//   var scale = [1.0, 1.5];
//   return new _rsvp.Promise(function (resolve) {
//     animateHeart($heart, scale[0], scale[1], function () {
//       animateHeart($heart, scale[1], scale[0], function () {
//         _this3.sendWidgetAction("toggleLike").then(function () {
//           return resolve();
//         });
//       });
//     });
//   });
// },


  faHeart = faHeart;

  public isCloseIconHovered = false;
  public isLiked = false;
  public hashHeart: '#far-heart' | '#heart' = '#far-heart';

  handleCloseIconHover(event: MouseEvent) {
    if (this.isCloseIconHovered) {
      this.isCloseIconHovered = false;
    } else {
      this.isCloseIconHovered = true;
    }
  }

  like(event: any) {
    if (this.isLiked) {
      this.hashHeart = '#far-heart';
      this.isLiked = false;
    } else {
      this.hashHeart = '#heart';
      this.isLiked = true;
    }

  }

}
