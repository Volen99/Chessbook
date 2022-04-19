import {NgModule} from "@angular/core";
import {LoggedOutHomeComponent} from "./logged-out-home.component";
import {LoggedOutHomeRoutingModule} from "./logged-out-home-routing.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    LoggedOutHomeComponent,

  ],
  imports: [
    CommonModule,

    LoggedOutHomeRoutingModule,
  ],
  providers: [
  ]
})
export class LoggedOutHomeModule {
}
