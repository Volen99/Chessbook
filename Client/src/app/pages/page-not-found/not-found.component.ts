import {Component, OnInit} from '@angular/core';
import {NbMenuService} from "../../sharebook-nebular/theme/components/menu/menu.service";

export interface IStar {
  right: number;
  top: number;

}

@Component({
  selector: 'app-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {

  constructor(private menuService: NbMenuService) {
  }

  ngOnInit(): void {
    for (let i = 1; i <= 40; i++) {
      let right = Math.random() * 1500;
      let top = Math.random() * 1000; // screen.height;
      this.stars.push({right, top});
    }
  }

  stars: IStar[] = [];

  goToHome() {
    this.menuService.navigateHome();
  }


}
