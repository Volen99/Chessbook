import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {DomSanitizer} from "@angular/platform-browser";

import {SmartTableData} from "../../core/interfaces/common/smart-table";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {DonationsService} from "./donations-service";

@Component({
  selector: 'app-donator',
  templateUrl: './donator.component.html',
  styleUrls: ['./donator.component.scss']
})
export class DonatorComponent implements OnInit {

  constructor(private service: SmartTableData, private sanitizer: DomSanitizer,
              private donationsService: DonationsService, private notifier: NbToastrService) {
    this.source.setPage(2);

    this.donationsService.listDonators('admin')
      .subscribe((dataServer) => {
          let data = dataServer.data;
          this.source.load(data);
        },
        err => this.notifier.danger(err.message, 'Error'));
  }

  ngOnInit(): void {

  }


  settings = {
    pager: {
      display: true,
      perPage: 50
    },
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      link: {
        title: 'Link',
        type: 'string',
      },
      message: {
        title: 'Message',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      col: {
        title: 'Col',
        type: 'number',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  onCreateConfirm(event): void {
    this.donationsService.create(event.newData)
      .subscribe((data) => {
          event.confirm.resolve();
        },
        err => event.confirm.reject());
  }

  onEditConfirm(event) {
    debugger
    this.donationsService.edit(event.data.id, event.newData)
      .subscribe((data) => {
          event.confirm.resolve();
        },
        err => event.confirm.reject());
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.donationsService.delete(event.data.id)
        .subscribe((data) => {
            event.confirm.resolve();
          },
          err => event.confirm.reject());
    } else {
      event.confirm.reject();
    }
  }

}
