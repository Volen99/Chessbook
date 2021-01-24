import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormReactive } from '../../../shared/shared-forms/form-reactive';
import { FormGroup } from '@angular/forms';
import { FormValidatorService } from '../../../shared/shared-forms/form-validator.service';
import { USER_TERMS_VALIDATOR } from '../../../shared/form-validators/user-validators';

@Component({
  selector: 'app-customize-experience',
  templateUrl: './customize-experience.component.html',
  styleUrls: [ './customize-experience.component.scss' ]
})
export class CustomizeExperienceComponent extends FormReactive implements OnInit {
  @Input() hasCodeOfConduct = false;

  @Output() formBuilt = new EventEmitter<FormGroup>();

  @Output() receiveEmailClick = new EventEmitter<void>();
  @Output() letOthersFindYouClick = new EventEmitter<void>();
  @Output() personalizedAdsClick = new EventEmitter<void>();

  @Output() codeOfConductClick = new EventEmitter<void>();

  constructor(protected formValidatorService: FormValidatorService, private renderer: Renderer2) {
    super();
  }

  get instanceHost() {
    return window.location.host;
  }

  ngOnInit() {
    this.buildForm({
      receiveEmail: USER_TERMS_VALIDATOR,
      letOthersFindYou: USER_TERMS_VALIDATOR,
      personalizedAds: USER_TERMS_VALIDATOR,
    });

    setTimeout(() => this.formBuilt.emit(this.form));
  }

  onReceiveEmailClick(event: any) {
    event.preventDefault();
    this.receiveEmailClick.emit();

    this.renderer.removeClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-kemksi');
    this.renderer.addClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-urgr8i');

    this.renderer.removeClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-1n03560');
    this.renderer.addClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-p1n3y5');
  }

  onLetOthersFindYouClick(event: any) {
    event.preventDefault();
    this.letOthersFindYouClick.emit();

    this.renderer.removeClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-kemksi');
    this.renderer.addClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-urgr8i');

    this.renderer.removeClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-1n03560');
    this.renderer.addClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-p1n3y5');
  }

  onPersonalizedAdsClick(event: any) {
    event.preventDefault();
    this.personalizedAdsClick.emit();

    this.renderer.removeClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-kemksi');
    this.renderer.addClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-urgr8i');

    this.renderer.removeClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-1n03560');
    this.renderer.addClass(event.currentTarget.previousElementSibling.firstElementChild, 'r-p1n3y5');
  }

}
