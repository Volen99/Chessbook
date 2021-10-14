import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxValidationMessageComponent} from './validation-message/validation-message.component';
import {
  NgxFilterByNumberComponent,
} from './custom-smart-table-components/filter-by-number/filter-by-number.component';
import {PollComponent} from './poll/poll.component';
import {RenderOptionComponent} from './poll/render-option/render-option.component';
import {NbIconModule} from "../sharebook-nebular/theme/components/icon/icon.module";
import {SurveyComponent} from "./survey/survey.component";
import {NbInputModule} from "../sharebook-nebular/theme/components/input/input.module";
import {NbRadioModule} from "../sharebook-nebular/theme/components/radio/radio.module";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";
import {NbCardModule} from "../sharebook-nebular/theme/components/card/card.module";
import {NbProgressBarModule} from "../sharebook-nebular/theme/components/progress-bar/progress-bar.module";
import {EmptyStateComponent} from './empty-state/empty-state.component';
import {MediaGalleryComponent} from './media-gallery/media-gallery.component';
import {BlurhashComponent} from './blurhash/blurhash.component';
import {ItemComponent} from './media-gallery/item/item.component';
import {RelativeTimestampComponent} from './relative-timestamp/relative-timestamp.component';
import {CardComponent} from "./card/card.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const COMPONENTS = [
  NgxValidationMessageComponent,
  NgxFilterByNumberComponent,
  PollComponent,
  SurveyComponent,
  EmptyStateComponent,
  MediaGalleryComponent,
  BlurhashComponent,
  CardComponent,
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule,
    FontAwesomeModule,
  ],
  exports: [...COMPONENTS ],
  declarations: [...COMPONENTS, RenderOptionComponent, ItemComponent, RelativeTimestampComponent],
  entryComponents: [
    NgxFilterByNumberComponent,
  ],
})
export class ComponentsModule {
}
