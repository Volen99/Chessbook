import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../user/user.model";
import {DialogService} from "primeng/dynamicdialog";
import {AccountReportComponent} from "../../../../shared-moderation/report-modals/account-report.component";
import {NbDialogService} from "../../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {AppInjector} from "../../../../../app-injector";


@Component({
  selector: 'app-popover-more',
  templateUrl: './popover-more.component.html',
  styleUrls: ['./popover-more.component.scss'],
})
export class PopoverMoreComponent implements OnInit {
  @Input() items: any;
  @Input() theUserWhoUploadedThePost: User;


  constructor() {
  }

  ngOnInit(): void {
  }

  svgStyles = {
    "display": 'inline-block;',
    'flex-shrink': '0',
    'height': '1.25em',
    'margin-right': '12px',
    'max-width': '100%',
    'position': 'relative',
    "vertical-align": 'text-bottom',
    "-moz-user-select": 'none',
    "-ms-user-select": 'none',
    "-webkit-user-select": 'none',
    "user-select": 'none',
  };

  handleClick = e => {
    // debugger
    // const i = Number(e.currentTarget.getAttribute('data-index'));
    // const { action, to } = this.items[i];
    //
    // // this.props.onClose();
    //
    // if (typeof action === 'function') {
    //   e.preventDefault();
    //   action(e);
    // }/* else if (to) {
    //   e.preventDefault();
    //   this.context.router.history.push(to);
    // }*/

    let dialogService = AppInjector.get(NbDialogService);
    dialogService.open(AccountReportComponent, {
      // @ts-ignore
      context: {
        account: this.theUserWhoUploadedThePost,
      },
      closeOnEsc: true,
    });
  }

}
