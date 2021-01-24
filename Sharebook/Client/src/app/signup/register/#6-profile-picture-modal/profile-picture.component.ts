import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  hoverHandler(ev: any): void {
    this.renderer.removeClass(ev.target, 'r-1niwhzg');
    this.renderer.addClass(ev.target, 'r-c8f5pn');
  }

  hoverLeaveHandler(ev: any): void {
    this.renderer.removeClass(ev.target, 'r-c8f5pn');
    this.renderer.addClass(ev.target, 'r-1niwhzg');
  }

  ngOnInit(): void {
  }

}
