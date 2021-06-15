import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import {
  NbLayoutComponent,
  NbLayoutColumnComponent,
  NbLayoutFooterComponent,
  NbLayoutHeaderComponent,
} from './layout.component';

import { NbRestoreScrollTopHelper } from './restore-scroll-top.service';
import {KeyboardShortcutsComponent} from "./hotkeys/keyboard-shortcuts.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const NB_LAYOUT_COMPONENTS = [
  NbLayoutComponent,
  NbLayoutColumnComponent,
  NbLayoutFooterComponent,
  NbLayoutHeaderComponent,
  KeyboardShortcutsComponent // :D
];

@NgModule({
  imports: [
    NbSharedModule,
    FontAwesomeModule,
  ],
  declarations: [
    ...NB_LAYOUT_COMPONENTS,
  ],
  providers: [
    NbRestoreScrollTopHelper,
  ],
  exports: [
    ...NB_LAYOUT_COMPONENTS,
  ],
})
export class NbLayoutModule { }
