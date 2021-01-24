import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appRegisterForm]'
})
export class FormDirective {
  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  @HostListener('click')
  handleTextAreaClick() {
    this.renderer.removeClass(this.el.nativeElement, 'r-1kqtdi0');
    this.renderer.addClass(this.el.nativeElement, 'r-p1n3y5');
  }

  @HostListener('window:click', ['$event.target'])
  handleWindowClick(ev: any) {
    if (ev.tagName !== 'INPUT' && ev.tagName !== 'SELECT' && ev.tagName !== 'TEXTAREA') {
      this.renderer.removeClass(this.el.nativeElement, 'r-p1n3y5');
      this.renderer.addClass(this.el.nativeElement, 'r-1kqtdi0');
    }
  }

}
