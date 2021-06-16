import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-column',
  templateUrl: './sidebar-column.component.html',
  styleUrls: ['./sidebar-column.component.scss']
})
export class SidebarColumnComponent implements OnInit {

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
      { title: 'Status', link: '/chessbook.com', queryParams: { profile: true }  },
      { title: 'Chessbook for Business', link: '/chessbook.com' },
      { title: 'Developers', link: '/chessbook.com' },
    ];
  }

}
