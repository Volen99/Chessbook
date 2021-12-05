import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {mapValues, pickBy} from 'lodash-es';

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

import {AbuseService} from '../abuse.service';
import {Post} from "../../shared-main/post/post.model";
import {FormReactive} from "../../shared-forms/form-reactive";
import {AbusePredefinedReasonsString} from "../../models/moderation/abuse/abuse-reason.model";
import {FormValidatorService} from "../../shared-forms/form-validator.service";
import {ABUSE_REASON_VALIDATOR} from "../../shared-forms/form-validators/abuse-validators";
import {abusePredefinedReasonsMap} from "../../../core/utils/abuse/abuse-predefined-reasons";


import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {NbDialogRef} from "../../../sharebook-nebular/theme/components/dialog/dialog-ref";

@Component({
  selector: 'app-video-report',
  templateUrl: './video-report.component.html',
  styleUrls: ['./report.component.scss']
})
export class VideoReportComponent extends FormReactive implements OnInit {
  @Input() post: Post = null;

  error: string = null;
  predefinedReasons: { id: AbusePredefinedReasonsString, label: string, description?: string, help?: string }[] = [];

  constructor(
    protected formValidatorService: FormValidatorService,
    private abuseService: AbuseService,
    private notifier: NbToastrService,
    protected ref: NbDialogRef<VideoReportComponent>) {
    super();
  }

  faTimes = faTimes;

  get currentHost() {
    return window.location.host;
  }

  get timestamp() {
    return this.form.get('timestamp').value;
  }

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
  }

  hide() {
    this.ref.close();
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

}
