import { Component, OnInit } from '@angular/core';
import {MarkdownService} from "../../core/renderer/markdown.service";

import {
  faHeart,
} from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-about-chessbook-contributors',
  templateUrl: './about-chessbook-contributors.component.html',
  styleUrls: [ './about-chessbook-contributors.component.scss' ]
})
export class AboutChessbookContributorsComponent implements OnInit {
  creditsHtml: string;

  // private markdown = require('raw-loader!../../../../../CREDITS.md').default;
  private markdown = `# Code & Translators contributors

 * [Volencho99](https://twitter.com/volencho)
 * [Google](https://www.google.com/)
 * [Stack Overflow](https://stackoverflow.com/)
 * [Wikipedia](https://www.wikipedia.org/)

# Design


  * [Volencho99](https://www.instagram.com/volencho99/)
  * [Google](https://www.google.com/)
  * [Stack Overflow](https://stackoverflow.com/)
  * [Wikipedia](https://www.wikipedia.org/)
`;

  constructor (private markdownService: MarkdownService) { }

  async ngOnInit () {
    this.creditsHtml = await this.markdownService.unsafeMarkdownToHTML(this.markdown, true);
  }

  faHeart = faHeart;
}
