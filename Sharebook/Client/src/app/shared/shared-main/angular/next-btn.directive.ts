import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appRegisterNextBtn]'
})
export class NextBtnDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  test(): void {
    this.renderer.removeClass(this.el.nativeElement, 'r-icoktb');
    this.renderer.addClass(this.el.nativeElement, 'css-18t94o4');

    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    this.renderer.setAttribute(this.el.nativeElement, 'data-focusable', 'true');
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
  }

}
