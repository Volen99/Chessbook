import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SmartTableData} from "../../../core/interfaces/common/smart-table";
import {LocalDataSource} from "ng2-smart-table";
import {ChessRankingsService} from "./chess-rankings.service";

import {
  faTrophy
} from '@fortawesome/pro-light-svg-icons';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-chess-rankings',
  templateUrl: './chess-rankings.component.html',
  styleUrls: ['./chess-rankings.component.scss'],
  encapsulation: ViewEncapsulation.None // WARNING❗❗ FOR FLAGS TO WORK IN TABLE❗ Thanks https://stackoverflow.com/questions/38798002/styling-not-applying-to-child-component ♥
})
export class ChessRankingsComponent implements OnInit {
  constructor(private service: SmartTableData, private sanitizer: DomSanitizer) {
    this.source.setPage(2);

    const data = this.service.getData();

    let temp = JSON.parse(JSON.stringify(data)); // https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript ♥

    temp.forEach(item => {
      item.name = `<a href="https://en.wikipedia.org/wiki/${item.name.replace(/ /g, '_')}" target="_blank">${item.name}</a> <span class="flag-icon flag-icon-${item.alpha2Code}"></span>`;
    });

    this.source.load(temp);
  }

  ngOnInit(): void {
  }


  settings = {
    actions: false,
    pager: {
      display: true,
      perPage: 50
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      rank: {
        title: 'Rank',
        type: 'html',
        valuePrepareFunction: ((data, row) => {
          if (data === 1) {
            return '<span class="cell_rank_style-first">' + data + '</span>';
          } else if (data === 2) {
            return '<span class="cell_rank_style-second">' + data + '</span>';
          } else if (data === 3) {
            return '<span class="cell_rank_style-third">' + data + '</span>';
          } else {
            return data;
          }
        }),
      },
      name: {
        title: 'Name',
        type: 'html',
      },
      classical: {
        title: 'Classical',
        type: 'number',
      },
      rapid: {
        title: 'Rapid',
        type: 'number',
      },
      blitz: {
        title: 'Blitz',
        type: 'number',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  faTrophy = faTrophy;

  onDeleteConfirm(event): void {
    debugger
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
