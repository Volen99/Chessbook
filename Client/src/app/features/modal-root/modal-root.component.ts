import {
  AfterContentInit,
  AfterViewInit,
  Component, ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {multiply} from "color-blend";

import {MediaModalComponent} from "../media-modal/media-modal.component";

@Component({
  selector: 'app-modal-root',
  templateUrl: './modal-root.component.html',
  styleUrls: ['./modal-root.component.scss']
})
export class ModalRootComponent implements OnInit, AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  @ContentChildren(MediaModalComponent) children: QueryList<MediaModalComponent>;

  @ViewChild('nodeRef') nodeRef: ElementRef<HTMLDivElement>;

  // @Input() children: Node;
  @Input() onClose: () => any;
  @Input() backgroundColor: any;

  constructor() {

  }

  // componentDidUpdate
  ngOnChanges(changes: SimpleChanges): void {
    let {backgroundColor} = changes;
    if (backgroundColor) {
      if (this.backgroundColor) {
        this.backgroundColorState = multiply({ ...this.backgroundColor, a: 1 }, { r: 0, g: 0, b: 0, a: 0.7 });
      }
    }

  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.children.changes
      .subscribe((children) => {
        if (!!children && !this.children) {
          this.activeElement = document.activeElement;

          this.getSiblings().forEach(sibling => sibling.setAttribute('inert', true));
        }

        if (!this.children && !!children.previousValue) {
          this.getSiblings().forEach(sibling => sibling.removeAttribute('inert'));

          // Because of the wicg-inert polyfill, the activeElement may not be
          // immediately selectable, we have to wait for observers to run, as
          // described in https://github.com/WICG/inert#performance-and-gotchas
          Promise.resolve().then(() => {
            // @ts-ignore
            this.activeElement.focus({ preventScroll: true });
            this.activeElement = null;
          }).catch(console.error);
        }
      });
  }

  ngAfterViewInit(): void {
    this.visible = !!this.children;

    window.addEventListener('keyup', this.handleKeyUp, false);
    window.addEventListener('keydown', this.handleKeyDown, false);

    this.node = this.nodeRef.nativeElement;
  }

  // componentWillUnmount
  ngOnDestroy(): void {
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  visible: boolean;

  // @ts-ignore
  activeElement = this.children ? document.activeElement : null;

  node = null;

  backgroundColorState: any;

  handleKeyUp = (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27)
      && !!this.children) {
      this.onClose();
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      // @ts-ignore
      const focusable = Array.from(this.node.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((x) => window.getComputedStyle(x).display !== 'none');
      const index = focusable.indexOf(e.target);

      let element;

      if (e.shiftKey) {
        element = focusable[index - 1] || focusable[focusable.length - 1];
      } else {
        element = focusable[index + 1] || focusable[0];
      }

      if (element) {
        element.focus();
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }

  getSiblings = () => {
    return Array(...this.node.parentElement.childNodes).filter(node => node !== this.node);
  }

}
