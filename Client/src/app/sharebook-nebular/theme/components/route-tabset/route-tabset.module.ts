/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbRouteTabsetComponent } from './route-tabset.component';
import { NbIconModule } from '../icon/icon.module';
import {NbContextMenuModule} from "../context-menu/context-menu.module";

@NgModule({
  imports: [
    NbSharedModule,
    NbIconModule,
    NbContextMenuModule,
  ],
  declarations: [
    NbRouteTabsetComponent,
  ],
  exports: [
    NbRouteTabsetComponent,
  ],
})
export class NbRouteTabsetModule { }
