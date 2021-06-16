import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {FormReactive} from "../shared-forms/form-reactive";
import {FormValidatorService} from "../shared-forms/form-validator.service";
import {DOMAINS_VALIDATOR, getNotEmptyHosts} from "../shared-forms/form-validators/batch-domains-validators";

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-batch-domains-modal',
  templateUrl: './batch-domains-modal.component.html',
  styleUrls: ['./batch-domains-modal.component.scss']
})
export class BatchDomainsModalComponent extends FormReactive implements OnInit {
  @ViewChild('modal', {static: true}) modal: NgbModal;
  @Input() placeholder = 'example.com';
  @Input() action: string;
  @Output() domains = new EventEmitter<string[]>();

  private openedModal: NgbModalRef;

  constructor(protected formValidatorService: FormValidatorService, private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    if (!this.action) this.action = `Process domains`;

    this.buildForm({
      domains: DOMAINS_VALIDATOR
    });
  }

  faTimes = faTimes;

  openModal() {
    this.openedModal = this.modalService.open(this.modal, {centered: true});
  }

  hide() {
    this.openedModal.close();
  }

  submit() {
    this.domains.emit(
      getNotEmptyHosts(this.form.controls['domains'].value)
    );
    this.form.reset();
    this.hide();
  }
}
