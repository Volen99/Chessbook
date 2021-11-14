import {
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  AfterContentInit,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';

import {
  faTimes,
  faWindowMaximize,
  faWindowRestore
} from '@fortawesome/pro-light-svg-icons';
import {NbDialogRef} from '../../sharebook-nebular/theme/components/dialog/dialog-ref';
import {VideosDialogComponent} from './videos-dialog.component';

@Component({
  selector: 'dialog-wrapper-title',
  template: '<ng-content></ng-content>'
})
export class DialogWrapperTitleComponent {
  @HostBinding('class')
  class = 'dialog-wrapper_title';
}

@Component({
  selector: 'dialog-wrapper-body',
  template: '<ng-content></ng-content>'
})
export class DialogWrapperBodyComponent {
  @HostBinding('class')
  class = 'dialog-wrapper_body';
}

@Component({
  selector: 'dialog-wrapper-actions',
  template: '<ng-content></ng-content>'
})
export class DialogWrapperActionsComponent {
  @HostBinding('class')
  class = 'dialog-wrapper_actions';
}

export type DialogWrapperSize = 'auto' | 'small' | 'medium' | 'large' | 'extra-large' | 'full-screen';

@Component({
  selector: 'dialog-wrapper',
  templateUrl: './dialog-wrapper.component.html',
  styleUrls: ['./dialog-wrapper.component.scss']
})
export class DialogWrapperComponent implements AfterContentInit {

  private _isOpen = false;
  private _contentInit = false;

  element: any;

  @Input()
  public hasCloseButton = true;

  @Input()
  public closeOnOutsideSelect = false;

  @Input()
  public closeOnEscape = true;

  @Input()
  public dialogClass = '';

  @Input()
  public size: DialogWrapperSize = 'auto';

  @Input()
  public canMaximize = true;

  @Input()
  public maximized = false;

  @Output()
  public maximizedChange = new EventEmitter<boolean>();

  @Output()
  public closeButtonClick = new EventEmitter();

  @Input()
  public get isOpen() {
    return this._isOpen;
  }

  public set isOpen(value: boolean) {
    if (value !== this._isOpen) {
      this._isOpen = value;
      this.isOpenChange.emit(value);
    }
  }

  @Output() public isOpenChange = new EventEmitter<boolean>();

  public get internalIsOpen() {
    // The igx-dialog doesn't meassure correctly if it's instantiated as true
    // we wait for the content to be ready before opening
    return this._contentInit && this._isOpen;
  }

  constructor(private changeDetection: ChangeDetectorRef, private ref: NbDialogRef<VideosDialogComponent>) {
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this._contentInit = true;
      this.changeDetection.markForCheck();
    });
  }

  faTimes = faTimes;
  faWindowMaximize = faWindowMaximize;
  faWindowRestore = faWindowRestore;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  handleCloseButtonClick() {
    this.ref.close();
    this.closeButtonClick.emit();
    // this.dialog.close();
  }

  handleMaximizeButtonClick() {
    this.maximized = !this.maximized;
    this.maximizedChange.emit(this.maximized);
  }
}
