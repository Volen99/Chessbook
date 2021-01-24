import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCheckbox]'
})
export class CheckboxDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  @HostListener('click')
  handleOnClick() {
    this.renderer.removeClass(this.el.nativeElement, 'r-1kqtdi0');
    this.renderer.addClass(this.el.nativeElement, 'r-p1n3y5');
  }

  @HostListener('mouseenter')
  handleHover () {
    this.renderer.addClass(this.el.nativeElement, 'r-1l6q6pb');
  }

  @HostListener('mouseleave')
  handleUnHover () {
    this.renderer.removeClass(this.el.nativeElement, 'r-1l6q6pb');
  }

}
