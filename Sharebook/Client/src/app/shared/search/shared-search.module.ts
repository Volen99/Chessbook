import {NgModule} from '@angular/core';
import {SearchService} from './search.service';
import {SharedMainModule} from "../main/shared-main.module";

@NgModule({
  imports: [
    SharedMainModule
  ],

  declarations: [],

  exports: [],

  providers: [
    SearchService
  ]
})
export class SharedSearchModule {
}
