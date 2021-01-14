import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor (private renderer: Renderer2, private el: ElementRef) {

  }

  @HostListener('mouseenter')
  handleMenuHover () {
    this.renderer.addClass(this.el.nativeElement, 'r-zv2cs0');
  }

  @HostListener('mouseleave', ['$event.target'])
  handleMenuUnHover () {
    this.renderer.removeClass(this.el.nativeElement, 'r-zv2cs0');
  }

}
