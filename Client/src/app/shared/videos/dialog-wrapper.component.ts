import { Component, Input, HostBinding, Output, EventEmitter, AfterContentInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PositionSettings, IDialogEventArgs, IToggleView, IgxDialogComponent } from '@infragistics/igniteui-angular';

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
export class DialogWrapperComponent implements IToggleView, AfterContentInit {

    private _isOpen = false;
    private _contentInit = false;

    element: any;

    @ViewChild(IgxDialogComponent, {read: IgxDialogComponent})
    public dialog!: IgxDialogComponent;

    @Input()
    public hasCloseButton = false;

    @Input()
    public closeOnOutsideSelect = false;

    @Input()
    public closeOnEscape = true;

    @Input()
    public dialogClass = '';

    @Input()
    public size: DialogWrapperSize = 'auto';

    @Input()
    public positionSettings: PositionSettings = {
        openAnimation: undefined,
        closeAnimation: undefined,
    };

    @Input()
    public canMaximize = false;

    @Input()
    public maximized = false;

    @Output()
    public maximizedChange = new EventEmitter<boolean>();

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output()
    public onOpen = new EventEmitter<IDialogEventArgs>();

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output()
    public onClose = new EventEmitter<IDialogEventArgs>();

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output()
    public onOpened = new EventEmitter<IDialogEventArgs>();

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

    constructor(private changeDetection: ChangeDetectorRef) {
    }

    ngAfterContentInit(): void {
        setTimeout(() => {
            this._contentInit = true;
            this.changeDetection.markForCheck();
        });
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    handleOnOpen(args: IDialogEventArgs) {
        this.onOpen.emit(args);
    }

    handleOnClose(args: IDialogEventArgs) {
        this.isOpen = false;
        this.onClose.emit(args);
    }

    handleOnOpened(args: IDialogEventArgs) {
        this.onOpened.emit(args);
    }

    handleCloseButtonClick() {
        this.closeButtonClick.emit();
        this.dialog.close();
    }

    handleMaximizeButtonClick() {
        this.maximized = !this.maximized;
        this.maximizedChange.emit(this.maximized);
    }
}
