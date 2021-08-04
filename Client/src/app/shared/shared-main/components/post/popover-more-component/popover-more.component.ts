import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../user/user.model";
import {DialogService} from "primeng/dynamicdialog";
import {AccountReportComponent} from "../../../../shared-moderation/report-modals/account-report.component";
import {NbDialogService} from "../../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {AppInjector} from "../../../../../app-injector";
import {VideoReportComponent} from "../../../../shared-moderation/report-modals/video-report.component";
import {IPost} from "../../../../posts/models/tweet";
import {Post} from "../../../post/post.model";


@Component({
  selector: 'app-popover-more',
  templateUrl: './popover-more.component.html',
  styleUrls: ['./popover-more.component.scss'],
})
export class PopoverMoreComponent implements OnInit {
  @Input() items: any;
  @Input() post: Post;


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
     const i = Number(e.currentTarget.getAttribute('data-index'));
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

    if (i === 4) {
      let dialogService = AppInjector.get(NbDialogService);
      dialogService.open(VideoReportComponent, {
        // @ts-ignore
        context: {
          video: this.post,
        },
        closeOnBackdropClick: true,
        closeOnEsc: false,
      });
    }

  }

}
