import {Component, HostListener, OnInit, Renderer2} from '@angular/core';

import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import {Month} from "../../../core/Public/Models/Enum/month";

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['../../../../assets/css/site.css', '../register.component.css', './account-modal.component.css']
})
export class AccountModalComponent implements OnInit {
  private renderer: Renderer2;

  constructor(renderer: Renderer2) {
    this.renderer = renderer;
  }

  public isNameCountOver40: boolean = false;

  public months = Month;
  public days: number[] = [];
  public years: number[] = [];

  ngOnInit(): void {
    for (let day = 1; day <= 31; day++) {
      this.days.push(day);
    }

    for (let year = DateTime.now.year; year >= DateTime.now.year - 115; year--) {
      this.years.push(year);
    }
  }

  public nameCurrentCount: number = 0;

  @HostListener('window:keyup', ['$event'])
  inputKeyupHandler(ev: KeyboardEvent): void {
    if ((ev.target as HTMLInputElement).maxLength === 40) {
      this.nameCurrentCount = (ev.target as HTMLInputElement).value.length;

      this.isNameCountOver40 = this.nameCurrentCount > 40;
    }
  }

}
