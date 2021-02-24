import {ModuleWithProviders, NgModule} from "@angular/core";
import {MenuInternalService, MenuService} from "./menu.service";
import {MenuComponent, MenuItemComponent} from "./menu.component";
import {SharedModule} from "../../../shared/shared.module";
import {SharedGlobalIconModule} from "../../../shared/shared-icons/shared-global-icon.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

const nbMenuComponents = [MenuComponent, MenuItemComponent];

const NB_MENU_PROVIDERS = [MenuService, MenuInternalService];

@NgModule({
  imports: [
    CommonModule,

    SharedModule,
    SharedGlobalIconModule,
    RouterModule,
  ],
  declarations: [...nbMenuComponents],
  exports: [...nbMenuComponents],
})
export class MenuModule {
  static forRoot(): ModuleWithProviders<MenuModule> {
    return {
      ngModule: MenuModule,
      providers: [
        ...NB_MENU_PROVIDERS,
      ],
    };
  }
}