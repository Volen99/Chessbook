import {Component, EventEmitter, Output, ViewChild, ElementRef, HostBinding} from '@angular/core';
import html2canvas, {Options} from '@indigo/html2canvas';
import {HttpErrorResponse} from '@angular/common/http';

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

import {NbInputDirective} from '../../../sharebook-nebular/theme/components/input/input.directive';
import {ICustomerFeedback} from './feedback.model';
import {CustomerFeedbackService, FeedbackFormMode, IActionItem} from './feedback.service';
import {UserStore} from '../../../core/stores/user.store';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  @ViewChild('messageInput', {read: NbInputDirective})
  public messageInput!: NbInputDirective;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onClose = new EventEmitter();

  @HostBinding('style.min-height.px')
  public minHeight = 0;

  public tooltipText!: string;

  public get ratingItems() {
    return this.feedbackService.ratingItems;
  }

  public get feedbackMessage() {
    return this.feedbackService.feedbackMessage;
  }

  public set feedbackMessage(value: string) {
    this.feedbackService.feedbackMessage = value;
  }

  public get feedbackRate() {
    return this.feedbackService.feedbackRate;
  }

  public set feedbackRate(value: IActionItem) {
    this.feedbackService.feedbackRate = value;
  }

  public get mode() {
    return this.feedbackService.mode;
  }

  public set mode(value: FeedbackFormMode) {
    this.feedbackService.mode = value;
  }

  public get includeScreenshot() {
    return this.feedbackService.includeScreenshot;
  }

  public set includeScreenshot(value: boolean) {
    this.feedbackService.includeScreenshot = value;
  }

  private authEmail!: string;

  constructor(
    private elementRef: ElementRef,
    private feedbackService: CustomerFeedbackService,
    private authService: UserStore,
  ) {
  }

  faTimes = faTimes;

  public initialize(): void {
    this.initializeMode();
    this.authEmail = this.authService.getUser()?.email ?? '';
  }

  public setTooltipText(event: string) {
    this.tooltipText = event.replace(/\s+/g, '');
  }

  public handleSubmit(event: any) {
    event.preventDefault();
    event.stopPropagation();

    this.fixHeight();
    this.sendFeedback();
  }

  public closeForm(event: any) {
    event.preventDefault();
    event.stopPropagation();
   // this.onClose.emit();
  }

  public setRate(value: IActionItem) {
    this.feedbackRate = value;
  }

  public updateFeedbackMessage(event: InputEvent) {
    this.feedbackMessage = (event.target as HTMLInputElement).value.trim();
  }

  public handleIncludeScreenshotChange(checked: boolean) {
    this.includeScreenshot = checked;
  }

  private initializeMode() {
    if (this.mode === 'sent' || this.mode === 'failed') {
      this.mode = 'form';
      this.minHeight = 0;
    }

    if (this.mode === 'form') {
      requestAnimationFrame(() => {
       //  this.messageInput.nativeElement.focus();
      });
    }
  }

  private fixHeight() {
    const element = (this.elementRef.nativeElement as Element);
    this.minHeight = element.clientHeight;
  }

  private sendFeedback() {
    this.mode = 'sending';

    // The following setTimeout avoids the execution of the sendFeedbackAsync function before the mode switch.
    setTimeout(() => this.sendFeedbackAsync(), 100);
  }

  private async sendFeedbackAsync() {
    const feedback: ICustomerFeedback = {
      email: this.authEmail ?? this.authService.getUser()?.email,
      message: this.feedbackMessage,
      rating: this.feedbackRate.name
    };
    if (this.includeScreenshot) {
      feedback.screenshot = await this.getScreenshotData();
    }
    try {
      await this.feedbackService.sendFeedback(feedback);
      this.handleFormSuccess();
    } catch (error) {
      this.handleFormError(error);
    }
  }

  private reset() {
    this.feedbackMessage = '';
    this.feedbackRate = this.feedbackService.defaultRateItem;
    this.includeScreenshot = false;
  }

  private handleFormSuccess() {
    this.mode = 'sent';
    this.reset();
  }

  private handleFormError(error: HttpErrorResponse) {
    this.mode = 'failed';
    console.error('Error sending feedback', error);
  }

  // A method that uses the `html2canvas` library to take a screenshot of the current page.
  // For more details see the [official documentation](https://html2canvas.hertzen.com/documentation).
  private async getScreenshotData() {
    const options: Partial<Options> = {ignoreElements: elem => elem === this.elementRef.nativeElement};
    const canvas = await html2canvas(document.body, options);
    return canvas.toDataURL('image/jpeg');
  }
}
