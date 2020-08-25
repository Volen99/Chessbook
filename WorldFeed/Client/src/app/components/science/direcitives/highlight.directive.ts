import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[appSciencePostHighlight]'
})
export class HighlightDirective {
  private el: ElementRef;         // It's not a good practice to directly access DOM elements via ElementRef. Use Renderer2

  constructor(el: ElementRef) {
    this.el = el;
  }

  @Input() defaultColor: string;

  // Inside the directive the property is known as highlightColor. Outside the directive, where you bind to it,
  // it's known as appSciencePostHighlight.
  @Input('appSciencePostHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
