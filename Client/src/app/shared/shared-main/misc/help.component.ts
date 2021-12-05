import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  TemplateRef
} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

import {
  faQuestion,
} from '@fortawesome/pro-light-svg-icons';

import {SharebookTemplateDirective} from "../angular/directives/sharebook-template.directive";
import {ENHANCED_RULES, TEXT_RULES} from "../../../core/utils/markdown";

@Component({
  selector: 'app-help',
  styleUrls: ['./help.component.scss'],
  templateUrl: './help.component.html'
})

export class HelpComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() helpType: 'custom' | 'markdownText' | 'markdownEnhanced' = 'custom';
  @Input() tooltipPlacement = 'right auto';
  @Input() icon: IconDefinition = faQuestion;
  @Input() title = `Get help`;
  @Input() autoClose = 'outside';

  @ContentChildren(SharebookTemplateDirective) templates: QueryList<SharebookTemplateDirective<'preHtml' | 'customHtml' | 'postHtml'>>;

  isPopoverOpened = false;
  mainHtml = '';

  preHtmlTemplate: TemplateRef<any>;
  customHtmlTemplate: TemplateRef<any>;
  postHtmlTemplate: TemplateRef<any>;

  ngOnChanges() {
    this.init();
  }

  ngOnInit() {
    this.init();
  }

  ngAfterContentInit() {
    {
      const t = this.templates.find(t => t.name === 'preHtml');
      if (t) this.preHtmlTemplate = t.template;
    }

    {
      const t = this.templates.find(t => t.name === 'customHtml');
      if (t) this.customHtmlTemplate = t.template;
    }

    {
      const t = this.templates.find(t => t.name === 'postHtml');
      if (t) this.postHtmlTemplate = t.template;
    }
  }

  private init() {
    if (this.helpType === 'markdownText') {
      this.mainHtml = this.formatMarkdownSupport(TEXT_RULES);
      return;
    }

    if (this.helpType === 'markdownEnhanced') {
      this.mainHtml = this.formatMarkdownSupport(ENHANCED_RULES);
      return;
    }
  }

  private formatMarkdownSupport(rules: string[]) {
    // tslint:disable:max-line-length
    return `<a href="https://en.wikipedia.org/wiki/Markdown#Example" target="_blank" rel="noopener noreferrer">Markdown</a> compatible that supports:` +
      this.createMarkdownList(rules);
  }

  private createMarkdownList(rules: string[]) {
    const rulesToText = {
      emphasis: `Emphasis`,
      link: `Links`,
      newline: `New lines`,
      list: `Lists`,
      image: `Images`
    };

    const bullets = rules.map(r => rulesToText[r])
      .filter(text => text)
      .map(text => '<li>' + text + '</li>')
      .join('');

    return '<ul>' + bullets + '</ul>';
  }
}
