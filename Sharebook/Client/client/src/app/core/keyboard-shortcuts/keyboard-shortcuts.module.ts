import { NgModule } from '@angular/core';
import { SharedMainModule } from '../../shared/shared-main';
import { KeyboardShortcutsComponent } from './keyboard-shortcuts.component';
import { SharedGlobalIconModule } from '../../shared/shared-icons/shared-global-icon.module';

@NgModule({
  declarations: [
    KeyboardShortcutsComponent,
  ],
  exports: [
  ],
  imports: [
    SharedMainModule,
    SharedGlobalIconModule,
  ]
})
export class KeyboardShortcutsModule { }
