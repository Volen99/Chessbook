import { InputMaskModule } from 'primeng/inputmask';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedMainModule } from '../shared-main/shared-main.module';
import { DynamicFormFieldComponent } from './dynamic-form-field.component';
import { FormValidatorService } from './form-validator.service';
import { InputToggleHiddenComponent } from './input-toggle-hidden.component';
import { InputSwitchComponent } from './input-switch.component';
import { MarkdownTextareaComponent } from './markdown-textarea.component';
import { SharebookCheckboxComponent } from './sharebook-checkbox.component';
import { PreviewUploadComponent } from './preview-upload.component';
import { ReactiveFileComponent } from './reactive-file.component';
import { TextareaAutoResizeDirective } from './textarea-autoresize.directive';
import { TimestampInputComponent } from './timestamp-input.component';
import { SelectChannelComponent } from './select/select-channel.component';
import { SelectOptionsComponent } from './select/select-options.component';
import { SelectTagsComponent } from './select/select-tags.component';
import { SelectCheckboxComponent } from './select/select-checkbox.component';
import { SharedGlobalIconModule } from '@app/shared/shared-icons/shared-global-icon.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,

    InputMaskModule,
    NgSelectModule,

    SharedMainModule,
    SharedGlobalIconModule
  ],

  declarations: [
    InputToggleHiddenComponent,
    MarkdownTextareaComponent,
    SharebookCheckboxComponent,
    PreviewUploadComponent,
    ReactiveFileComponent,
    TextareaAutoResizeDirective,
    TimestampInputComponent,

    InputSwitchComponent,

    SelectChannelComponent,
    SelectOptionsComponent,
    SelectTagsComponent,
    SelectCheckboxComponent,

    DynamicFormFieldComponent
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule,

    InputMaskModule,
    NgSelectModule,

    InputToggleHiddenComponent,
    MarkdownTextareaComponent,
    SharebookCheckboxComponent,
    PreviewUploadComponent,
    ReactiveFileComponent,
    TextareaAutoResizeDirective,
    TimestampInputComponent,

    InputSwitchComponent,

    SelectChannelComponent,
    SelectOptionsComponent,
    SelectTagsComponent,
    SelectCheckboxComponent,

    DynamicFormFieldComponent
  ],

  providers: [
    FormValidatorService
  ]
})
export class SharedFormModule {
}
