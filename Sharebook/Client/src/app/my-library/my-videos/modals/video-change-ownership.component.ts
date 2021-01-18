import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Notifier, UserService } from '../../../core';
import { OWNERSHIP_CHANGE_USERNAME_VALIDATOR } from '../../../shared/form-validators/video-ownership-change-validators';
import { Video, VideoOwnershipService } from '../../../shared/shared-main';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormReactive } from '../../../shared/shared-forms/form-reactive';
import { FormValidatorService } from '../../../shared/shared-forms/form-validator.service';

@Component({
  selector: 'app-video-change-ownership',
  templateUrl: './video-change-ownership.component.html',
  styleUrls: [ './video-change-ownership.component.scss' ]
})
export class VideoChangeOwnershipComponent extends FormReactive implements OnInit {
  @ViewChild('modal', { static: true }) modal: ElementRef;

  usernamePropositions: string[];

  error: string = null;

  private video: Video | undefined = undefined;

  constructor(
    protected formValidatorService: FormValidatorService,
    private videoOwnershipService: VideoOwnershipService,
    private notifier: Notifier,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm({
      username: OWNERSHIP_CHANGE_USERNAME_VALIDATOR
    });
    this.usernamePropositions = [];
  }

  show(video: Video) {
    this.video = video;
    this.modalService
      .open(this.modal, { centered: true })
      .result
      .then(() => this.changeOwnership())
      .catch((_) => _); // Called when closing (cancel) the modal without validating, do nothing
  }

  search(event: { query: string }) {
    const query = event.query;
    this.userService.autocomplete(query)
      .subscribe(
        usernames => this.usernamePropositions = usernames,

        err => this.notifier.error(err.message)
      );
  }

  changeOwnership() {
    const username = this.form.value['username'];

    this.videoOwnershipService
      .changeOwnership(this.video.id, username)
      .subscribe(
        () => this.notifier.success($localize`Ownership change request sent.`),

        err => this.notifier.error(err.message)
      );
  }
}
