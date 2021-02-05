import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserQueryParameterGeneratorService} from "./services/user-query-parameter-generator.service";
import {PostsModule} from "./posts/posts.module";
import { TimelineContainerComponent } from './containers/timeline-container/timeline-container.component';

@NgModule({
    declarations: [TimelineContainerComponent],
    imports: [
        CommonModule,
        PostsModule,
    ],
    providers: [
        UserQueryParameterGeneratorService,
    ]
})
export class SharedModule {
}
