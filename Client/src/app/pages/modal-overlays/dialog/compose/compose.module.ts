import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {UploadComponent} from "./upload/upload.component";
import {FileDropDirective} from "./upload/file-drop.directive";
import {FileSelectDirective} from "./upload/file-select.directive";
import {MediaGroupComponent} from './upload/media-group/media-group.component';
import {MediaSplitDirective} from "./upload/media-split.directive";
import {UploadService} from "./upload/upload.service";
import {UploadQueryGeneratorService} from "./upload/query/upload-query-generator.service";
import {UploadQueryExecutorService} from "./upload/chunked-upload/upload-query-executor.service";
import {UploadRequesterService} from "./upload/chunked-upload/upload-requester.service";
import {ChunkedUploaderService} from "./upload/chunked-upload/chunked-uploader.service";
import {UploadApi} from "./upload/backend/upload.api";
import {UploadClientRequiredParametersValidatorService} from "./upload/validators/upload-client-required-parameters-validator.service";
import {NbCardModule} from "../../../../sharebook-nebular/theme/components/card/card.module";
import {NbButtonModule} from "../../../../sharebook-nebular/theme/components/button/button.module";
import {SharedModule} from "../../../../shared/shared.module";
import {NbIconModule} from "../../../../sharebook-nebular/theme/components/icon/icon.module";
import {NbPopoverModule} from "../../../../sharebook-nebular/theme/components/popover/popover.module";
import {SharedMainModule} from "../../../../shared/shared-main/shared-main.module";
import { PollButtonComponent } from './upload/poll-button/poll-button.component';
import {
  OptionComponent,
  PollFormComponent
} from './upload/containers/poll-form/poll-form.component';
import {NbInputModule} from "../../../../sharebook-nebular/theme/components/input/input.module";
import {NbSelectModule} from "../../../../sharebook-nebular/theme/components/select/select.module";
import { ReplyCommentComponent } from './upload/reply-comment/reply-comment.component';
import {SharedFormModule} from "../../../../shared/shared-forms/shared-form.module";
import {AssetsPanelService} from "./upload/assets-panel.service";

@NgModule({
  declarations: [
    UploadComponent,
    MediaGroupComponent,

    FileDropDirective,
    FileSelectDirective,
    MediaSplitDirective,
    PollButtonComponent,
    PollFormComponent,
    PollFormComponent,
    OptionComponent,
    ReplyCommentComponent,
  ],

    imports: [
        CommonModule,

        SharedModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        NbPopoverModule,
        SharedMainModule,
        NbInputModule,
        NbSelectModule,
        FontAwesomeModule,
        SharedFormModule,
    ],

    exports: [
        UploadComponent,

        FileDropDirective,
        FileSelectDirective,
    ],

    providers: [
        UploadService,
        UploadApi,
        UploadQueryGeneratorService,
        UploadQueryExecutorService,
        UploadRequesterService,
        ChunkedUploaderService,
        UploadClientRequiredParametersValidatorService,
        AssetsPanelService,
    ],
})
export class ComposeModule {
}
