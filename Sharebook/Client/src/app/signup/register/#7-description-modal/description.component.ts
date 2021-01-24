import {Component, HostListener, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
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
