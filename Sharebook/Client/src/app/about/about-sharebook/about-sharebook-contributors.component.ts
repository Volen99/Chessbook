import { Component, OnInit } from '@angular/core';
import { MarkdownService } from '../../core';

@Component({
  selector: 'app-about-sharebook-contributors',
  templateUrl: './about-sharebook-contributors.component.html',
  styleUrls: [ './about-sharebook-contributors.component.scss' ]
})
export class AboutSharebookContributorsComponent implements OnInit {
  creditsHtml: string;

  private markdown = require('raw-loader!../../../../../CREDITS.md').default;

  constructor(private markdownService: MarkdownService) {
  }

  async ngOnInit() {
    this.creditsHtml = await this.markdownService.completeMarkdownToHTML(this.markdown);
  }
}
