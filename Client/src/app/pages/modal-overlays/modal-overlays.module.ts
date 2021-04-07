import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// modules
import { ModalOverlaysRoutingModule } from './modal-overlays-routing.module';

// components
import { ModalOverlaysComponent } from './modal-overlays.component';
import { DialogComponent } from './dialog/dialog.component';
import { ShowcaseDialogComponent } from './dialog/showcase-dialog/showcase-dialog.component';
import { DialogNamePromptComponent } from './dialog/dialog-name-prompt/dialog-name-prompt.component';
import { WindowComponent } from './window/window.component';
import { WindowFormComponent } from './window/window-form/window-form.component';
import { ToastrComponent } from './toastr/toastr.component';
import { PopoversComponent } from './popovers/popovers.component';
import {
  NgxPopoverCardComponent, NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
} from './popovers/popover-examples.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import {ThemeModule} from "../../theme/theme.module";
import {NbDialogModule} from "../../sharebook-nebular/theme/components/dialog/dialog.module";
import {NbWindowModule} from "../../sharebook-nebular/theme/components/window/window.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbCheckboxModule} from "../../sharebook-nebular/theme/components/checkbox/checkbox.module";
import {NbTabsetModule} from "../../sharebook-nebular/theme/components/tabset/tabset.module";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";
import {NbPopoverModule} from "../../sharebook-nebular/theme/components/popover/popover.module";
import {NbSelectModule} from "../../sharebook-nebular/theme/components/select/select.module";
import {NbTooltipModule} from "../../sharebook-nebular/theme/components/tooltip/tooltip.module";
import {ComposeModule} from "./dialog/compose/compose.module";
import { WhoCanReplyComponent } from './popovers/components/who-can-reply/who-can-reply.component';
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbToggleModule} from "../../sharebook-nebular/theme/components/toggle/toggle.module";
import {NbRadioModule} from "../../sharebook-nebular/theme/components/radio/radio.module";


const COMPONENTS = [
  ModalOverlaysComponent,
  ToastrComponent,
  DialogComponent,
  ShowcaseDialogComponent,
  DialogNamePromptComponent,
  WindowComponent,
  WindowFormComponent,
  PopoversComponent,
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
  TooltipComponent,
];

const ENTRY_COMPONENTS = [
  ShowcaseDialogComponent,
  DialogNamePromptComponent,
  WindowFormComponent,
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
];

const MODULES = [
  FormsModule,
  ThemeModule,
  ModalOverlaysRoutingModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCardModule,
  NbCheckboxModule,
  NbTabsetModule,
  NbPopoverModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule,

  ComposeModule,
];

const SERVICES = [
];

@NgModule({
  imports: [
    ...MODULES,
    ComposeModule,
    NbIconModule,
    NbToggleModule,
    NbRadioModule,
  ],
  declarations: [
    ...COMPONENTS,
    WhoCanReplyComponent,
  ],
  providers: [
    ...SERVICES,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class ModalOverlaysModule {
}
