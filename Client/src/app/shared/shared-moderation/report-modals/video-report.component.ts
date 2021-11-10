import {mapValues, pickBy} from 'lodash-es';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {AbuseService} from '../abuse.service';
import {Post} from "../../shared-main/post/post.model";
import {FormReactive} from "../../shared-forms/form-reactive";
import {AbusePredefinedReasonsString} from "../../models/moderation/abuse/abuse-reason.model";
import {FormValidatorService} from "../../shared-forms/form-validator.service";
import {Notifier} from "../../../core/notification/notifier.service";
import {ABUSE_REASON_VALIDATOR} from "../../shared-forms/form-validators/abuse-validators";
import {abusePredefinedReasonsMap} from "../../../core/utils/abuse/abuse-predefined-reasons";

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {NbDialogRef} from "../../../sharebook-nebular/theme/components/dialog/dialog-ref";

@Component({
  selector: 'app-video-report',
  templateUrl: './video-report.component.html',
  styleUrls: ['./report.component.scss']
})
export class VideoReportComponent extends FormReactive implements OnInit {
  @Input() post: Post = null;

  @ViewChild('modal', {static: true}) modal: NgbModal;

  error: string = null;
  predefinedReasons: { id: AbusePredefinedReasonsString, label: string, description?: string, help?: string }[] = [];
  embedHtml: SafeHtml;

  private openedModal: NgbModalRef;

  constructor(
    protected formValidatorService: FormValidatorService,
    private modalService: NgbModal,
    private abuseService: AbuseService,
    private notifier: NbToastrService,
    private sanitizer: DomSanitizer,
    protected ref: NbDialogRef<VideoReportComponent>) {
    super();
  }

  faTimes = faTimes;

  get currentHost() {
    return window.location.host;
  }

  // get originHost() {
  //   if (this.isRemote()) {
  //     return this.video.account.host;
  //   }
  //
  //   return '';
  // }

  get timestamp() {
    return this.form.get('timestamp').value;
  }

  // getVideoEmbed() {
  //   return this.sanitizer.bypassSecurityTrustHtml(
  //     buildVideoOrPlaylistEmbed(
  //       buildVideoLink({
  //         baseUrl: this.video.embedUrl,
  //         title: false,
  //         warningTitle: false
  //       })
  //     )
  //   );
  // }

  ngOnInit() {
    this.buildForm({
      reason: ABUSE_REASON_VALIDATOR,
      predefinedReasons: mapValues(abusePredefinedReasonsMap, r => null),
      timestamp: {
        hasStart: null,
        startAt: null,
        hasEnd: null,
        endAt: null
      }
    });

    this.predefinedReasons = this.abuseService.getPrefefinedReasons('video');

    // this.embedHtml = this.getVideoEmbed()
  }

  svgStyles = {
    'display': 'inline-block',
    'fill': 'currentcolor',
    'flex-shrink': '0',
    'width': '1.5em',
    'height': '1.5em',
    'max-width': '100% ',
    'position': 'relative',
    'vertical-align': 'text-bottom',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
  };

  show() {
    this.openedModal = this.modalService.open(this.modal, {centered: true, keyboard: false, size: 'lg'});
  }

  hide() {
    this.ref.close();
    // this.openedModal.close();
    // this.openedModal = null;
  }

  report() {
    const reason = this.form.get('reason').value;
    const predefinedReasons = Object.keys(pickBy(this.form.get('predefinedReasons').value)) as AbusePredefinedReasonsString[];
    const {hasStart, startAt, hasEnd, endAt} = this.form.get('timestamp').value;

    this.abuseService.reportVideo({
      reason,
      predefinedReasons,
      post: {
        id: this.post.id,
        startAt: hasStart && startAt ? startAt : undefined,
        endAt: hasEnd && endAt ? endAt : undefined
      }
    }).subscribe(
      () => {
        this.notifier.success(`Post reported.`, 'Success');
        this.hide();
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

  // isRemote() {
  //   return !this.video.isLocal;
  // }
}
