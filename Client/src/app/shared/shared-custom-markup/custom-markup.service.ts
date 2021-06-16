import {ComponentRef, Injectable} from '@angular/core';
import {DynamicElementService} from './dynamic-element.service';
import {MarkdownService} from "../../core/renderer/markdown.service";
import {ContainerMarkupData} from "../models/custom-markup/custom-markup-data.model";


type AngularBuilderFunction = (el: HTMLElement) => ComponentRef<any>;
type HTMLBuilderFunction = (el: HTMLElement) => HTMLElement;

@Injectable()
export class CustomMarkupService {
  private htmlBuilders: { [selector: string]: HTMLBuilderFunction } = {
    'peertube-container': el => this.containerBuilder(el)
  };

  private customMarkdownRenderer: (text: string) => Promise<HTMLElement>;

  constructor(private dynamicElementService: DynamicElementService, private markdown: MarkdownService) {
    // this.customMarkdownRenderer = async (text: string) => this.buildElement(text);
  }

  getCustomMarkdownRenderer() {
    return this.customMarkdownRenderer;
  }

  async buildElement(text: string) {
    const html = await this.markdown.customPageMarkdownToHTML(text, this.getSupportedTags());

    const rootElement = document.createElement('div');
    rootElement.innerHTML = html;

    for (const selector of Object.keys(this.htmlBuilders)) {
      rootElement.querySelectorAll(selector)
        .forEach((e: HTMLElement) => {
          try {
            const element = this.execHTMLBuilder(selector, e);
            // Insert as first child
            e.insertBefore(element, e.firstChild);
          } catch (err) {
            console.error('Cannot inject component %s.', selector, err);
          }
        });
    }

    return rootElement;
  }

  private getSupportedTags() {
    return (Object.keys(this.htmlBuilders));
  }

  private execHTMLBuilder(selector: string, el: HTMLElement) {
    return this.htmlBuilders[selector](el);
  }

  private containerBuilder(el: HTMLElement) {
    const data = el.dataset as ContainerMarkupData;

    // Move inner HTML in the new element we'll create
    const content = el.innerHTML;
    el.innerHTML = '';

    const root = document.createElement('div');
    root.innerHTML = content;

    const layoutClass = data.layout
      ? 'layout-' + data.layout
      : 'layout-column';

    root.classList.add('peertube-container', layoutClass);

    if (data.width) {
      root.setAttribute('width', data.width);
    }

    if (data.title || data.description) {
      const headerElement = document.createElement('div');
      headerElement.classList.add('header');

      if (data.title) {
        const titleElement = document.createElement('h4');
        titleElement.innerText = data.title;
        headerElement.appendChild(titleElement);
      }

      if (data.description) {
        const descriptionElement = document.createElement('div');
        descriptionElement.innerText = data.description;
        headerElement.append(descriptionElement);
      }

      root.insertBefore(headerElement, root.firstChild);
    }

    return root;
  }

  private buildNumber(value: string) {
    if (!value) return undefined;

    return parseInt(value, 10);
  }

  private buildBoolean(value: string) {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return undefined;
  }

  private buildArrayNumber(value: string) {
    if (!value) return undefined;

    return value.split(',').map(v => parseInt(v, 10));
  }

  private buildArrayString(value: string) {
    if (!value) return undefined;

    return value.split(',');
  }
}
