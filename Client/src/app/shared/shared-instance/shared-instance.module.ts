
import { NgModule } from '@angular/core'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedMainModule } from '../shared-main/shared-main.module'
import { InstanceService } from './instance.service'

@NgModule({
  imports: [
    SharedMainModule,
    NgbAccordionModule
  ],

  declarations: [
  ],

  exports: [
  ],

  providers: [
    InstanceService
  ]
})
export class SharedInstanceModule { }
