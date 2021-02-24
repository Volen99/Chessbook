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
      { title: 'About', link: '/sharebook.com', queryParams: { profile: true } },
      { title: 'Status', link: '/sharebook.com' },
      { title: 'Sharebook for Business', link: '/sharebook.com' },
      { title: 'Developers', link: '/sharebook.com' },
    ];
  }

}
