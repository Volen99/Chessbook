import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public show: boolean = false;
  public revealOrHidePasswordText: string = 'Reveal password';

  toggalePass(): void {
    this.show = !this.show;
    this.revealOrHidePasswordText = this.show ? 'Reveal password' : 'Hide password';
  }

}
