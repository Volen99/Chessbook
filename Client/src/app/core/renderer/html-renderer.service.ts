import {Injectable} from '@angular/core';

import {LinkifierService} from './linkifier.service';
import {getCustomMarkupSanitizeOptions, getSanitizeOptions} from "../../shared/core-utils/renderer/html";

@Injectable()
export class HtmlRendererService {
  private sanitizeHtml: typeof import ('sanitize-html');

  constructor(private linkifier: LinkifierService) {

  }

  async convertToBr (text: string) {
    await this.loadSanitizeHtml();

    const html = text.replace(/\r?\n/g, '<br />');

    return this.sanitizeHtml(html, {
      allowedTags: [ 'br' ]
    });
  }

  async toSafeHtml(text: string, additionalAllowedTags: string[] = []) {
    const [html] = await Promise.all([
      // Convert possible markdown to html
      this.linkifier.linkify(text),

      this.loadSanitizeHtml()
    ]);

    let resHtml = html;

    let wrapper = document.createElement('span');
    wrapper.innerHTML = html;
    let p: any = wrapper.firstChild;

    let a = p.firstElementChild;
    if (a && !a.className.includes('linkified-mention')) {
      let spans = this.link_html(a.href);
      a.innerText = '';
      a.innerHTML = spans;

      a.classList.add('innerHtml-link');
      a.title = `${a.href}`;

      resHtml = p.innerHTML;
    }


    const options = additionalAllowedTags.length !== 0
      ? getCustomMarkupSanitizeOptions(additionalAllowedTags)
      : getSanitizeOptions();

    return this.sanitizeHtml(resHtml, options);
  }

  private async loadSanitizeHtml () {
    // FIXME: import('..') returns a struct module, containing a "default" field corresponding to our sanitizeHtml function
    this.sanitizeHtml = (await import('sanitize-html') as any).default;
  }
  // reference -> formatter.rb ♥
  private link_html(url: string) {
    let prefix = url.match(/(https?:\/\/(www\.)?|xmpp:)/)[0];   // ✔
    let text = url.substr(prefix.length, 30);                    // ✔
    let suffix = url.substring(prefix.length + 30);                    // ✔
    let cutoff = url.substring(prefix.length).length > 30;             // ✔

    return `<span class="invisible">${decodeURIComponent(prefix)}</span><span class="${cutoff ? 'ellipsis' : ''}">${decodeURIComponent(text)}</span><span class="invisible">${decodeURIComponent(suffix)}</span>`;

  }
}
