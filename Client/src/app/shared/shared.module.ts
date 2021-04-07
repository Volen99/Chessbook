import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserQueryParameterGeneratorService} from "./services/user-query-parameter-generator.service";
import {PostsModule} from "./posts/posts.module";
import { TimelineContainerComponent } from './containers/timeline-container/timeline-container.component';
import {RouterModule} from "@angular/router";
import {ShareButtonComponent} from "../share-button/share-button.component";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";

@NgModule({
    declarations: [TimelineContainerComponent, ShareButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostsModule,
    NbButtonModule,
  ],
    exports: [
        ShareButtonComponent
    ],
    providers: [
        UserQueryParameterGeneratorService,
    ]
})
export class SharedModule {
}
