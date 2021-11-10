import { Component, OnInit } from '@angular/core';
import {MarkdownService} from "../../core/renderer/markdown.service";

@Component({
  selector: 'app-about-chessbook-contributors',
  templateUrl: './about-chessbook-contributors.component.html',
  styleUrls: [ './about-chessbook-contributors.component.scss' ]
})
export class AboutChessbookContributorsComponent implements OnInit {
  creditsHtml: string;

  private markdown = require('raw-loader!../../../../../CREDITS.md').default;

  constructor (private markdownService: MarkdownService) { }

  async ngOnInit () {
    this.creditsHtml = await this.markdownService.unsafeMarkdownToHTML(this.markdown, true);
  }
}
