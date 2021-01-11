import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {Month} from "../../../core/Public/Models/Enum/month";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['../../../../assets/css/site.css', '../register.component.css', './description.component.css']
})
export class DescriptionComponent implements OnInit {
  private renderer: Renderer2;

  constructor(renderer: Renderer2) {
    this.renderer = renderer;
  }

  ngOnInit(): void {
  }

  public isBioCountOver40: boolean = false;
  public bioCurrentCount: number = 0;

  @HostListener('window:keyup', ['$event'])
  inputKeyupHandler(ev: KeyboardEvent): void {
    if ((ev.target as HTMLInputElement).maxLength === 160) {
      this.bioCurrentCount = (ev.target as HTMLInputElement).value.length;

      this.isBioCountOver40 = this.bioCurrentCount > 160;
    }
  }

}
