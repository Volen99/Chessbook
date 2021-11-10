import {Directive, EventEmitter, OnInit} from "@angular/core";
import {FormReactive} from "../shared-forms/form-reactive";
import {SelectChannelItem} from "../../../types/select-options-item.model";
import {PostPrivacy} from "../models/enums/post-privacy";
import {IPostConstant} from "./models/post-constant.model";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {PostsService} from "./posts.service";
import {CanComponentDeactivateResult} from "../../core/routing/can-deactivate-guard.service";

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class PostSend extends FormReactive implements OnInit {
  userVideoChannels: SelectChannelItem[] = [];
  videoPrivacies: IPostConstant<PostPrivacy>[] = [];

  firstStepPrivacyId: PostPrivacy;
  firstStepChannelId: number;

  abstract firstStepDone: EventEmitter<string>;
  abstract firstStepError: EventEmitter<void>;

  protected notifier: NbToastrService;

  protected postsService: PostsService;

  protected highestPrivacy: PostPrivacy;

  abstract canDeactivate(): CanComponentDeactivateResult;

  ngOnInit() {
    this.buildForm({});

    let privacies = {
      "1": "Public",
      "2": "Private",
     // "2": "Unlisted",
     // "4": "Internal"
    };

    const hashToPopulate: IPostConstant<PostPrivacy>[] = Object.keys(privacies)
      .map(dataKey => {
        const label = privacies[ dataKey ];

        const id = parseInt(dataKey, 10) as PostPrivacy;

        return {
          id,
          label: label
        };
      });

    const {videoPrivacies, defaultPrivacyId} = this.postsService.explainedPrivacyLabels(hashToPopulate);

    this.videoPrivacies = videoPrivacies;
    this.firstStepPrivacyId = defaultPrivacyId;

    this.highestPrivacy = this.postsService.getHighestAvailablePrivacy(hashToPopulate);
  }

  checkForm() {
    this.forceCheck();

    return this.form.valid;
  }
}
