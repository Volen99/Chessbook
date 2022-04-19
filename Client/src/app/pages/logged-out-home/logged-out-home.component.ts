import { Component, OnInit } from '@angular/core';


export interface ILink {
  text: string;
  routerLink: string;
}

@Component({
  selector: 'app-logged-out-home',
  templateUrl: './logged-out-home.component.html',
  styleUrls: ['./logged-out-home.component.scss']
})
export class LoggedOutHomeComponent implements OnInit {

  get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor() {
  }

  ngOnInit(): void {
    this.links = [
      {
        text: 'About',
        routerLink: '/about',
      },
      {
        text: 'Terms of Service',
        routerLink: '/terms',
      },
      {
        text: 'Contact us',
        routerLink: '/contact',
      },
    ];
  }

  links: ILink[];

}
