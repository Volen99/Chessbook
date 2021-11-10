import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-column',
  templateUrl: './sidebar-column.component.html',
  styleUrls: ['./sidebar-column.component.scss']
})
export class SidebarColumnComponent implements OnInit {
  @Input() hideWhoToFollow = false;

  constructor() { }

  ngOnInit(): void {
  }

  moreMenu = this.getMenuItems();

  get currentYear(): number {
    return new Date().getFullYear();
  }

  getMenuItems() {
    return [
      { title: 'About', link: '/about' },
      { title: 'Chessbook for Business', link: '/about' },
      { title: 'Developers', link: '/about', fragment: 'developers' },
    ];
  }

}
