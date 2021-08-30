import {NgModule} from '@angular/core';

import {FindInBulkService} from './find-in-bulk.service';
import {SearchService} from './search.service';
import {SharedMainModule} from "../shared-main/shared-main.module";
import {HighlightPipe} from "./highlight.pipe";
import {SuggestionComponent} from "./suggestion.component";
import {SearchTypeaheadComponent} from "./search-typeahead.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NbFormFieldModule} from "../../sharebook-nebular/theme/components/form-field/form-field.module";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";

@NgModule({
  imports: [
    SharedMainModule,
    //  SharedVideoPlaylistModule
    FontAwesomeModule,
    NbFormFieldModule,
    NbInputModule,
  ],

  declarations: [
    SearchTypeaheadComponent,
    SuggestionComponent,
    HighlightPipe,
  ],

  exports: [
    SearchTypeaheadComponent
  ],

  providers: [
    FindInBulkService,
    SearchService
  ]
})
export class SharedSearchModule {
}
