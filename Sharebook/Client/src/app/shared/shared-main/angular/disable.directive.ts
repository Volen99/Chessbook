import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

const DISABLED = 'disabled';
const APP_DISABLED = 'app-disabled';
const TAB_INDEX = 'tabindex';
const TAG_ANCHOR = 'a';

@Directive({
  selector: '[appDisable]'
})
export class DisableDirective implements OnChanges, AfterViewInit {
  @Input() appDisable = true;

  constructor(private eleRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges() {
    this.disableElement(this.eleRef.nativeElement);
  }

  ngAfterViewInit() {
    this.disableElement(this.eleRef.nativeElement);
  }

  private disableElement(element: any) {
    if (this.appDisable) {
      if (!element.hasAttribute(DISABLED)) {
        if (element.hasAttribute(TAB_INDEX)) {
          this.renderer.removeAttribute(element,'data-focusable');
          this.renderer.removeAttribute(element, TAB_INDEX);

          this.renderer.setAttribute(element, 'aria-disabled', 'true');

          this.renderer.removeClass(element, 'css-18t94o4');
          this.renderer.addClass(element, 'r-icoktb');
        }

        this.renderer.setAttribute(element, APP_DISABLED, '');
        this.renderer.setAttribute(element, DISABLED, 'true');

        // disabling anchor tab keyboard event
        if (element.tagName.toLowerCase() === TAG_ANCHOR) {
          this.renderer.setAttribute(element, TAB_INDEX, '-1');
        }
      }
    } else {
      if (element.hasAttribute(APP_DISABLED)) {
        if (element.getAttribute('disabled') !== '') {
          element.removeAttribute(DISABLED);
          element.removeAttribute('aria-disabled');

          element.setAttribute('data-focusable', 'true');
          element.setAttribute(TAB_INDEX, '0');



          element.classList.remove('r-icoktb');
          element.classList.add('css-18t94o4');
        }
        element.removeAttribute(APP_DISABLED);
        if (element.tagName.toLowerCase() === TAG_ANCHOR) {
          element.removeAttribute(TAB_INDEX);
        }
      }
    }
    // if (element.children) {
    //   for (let ele of element.children) {
    //     this.disableElement(ele);
    //   }
    // }
  }
}
