import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {debounce} from 'lodash';
import {fromJS} from "immutable";
import * as punycode from "punycode";

import {
  faSearchPlus,
  faPlay,
  faExternalLink,
  faFileAlt,
} from '@fortawesome/pro-light-svg-icons';

const IDNA_PREFIX = 'xn--';

const decodeIDNA = domain => {
  return domain
    .split('.')
    .map(part => part.indexOf(IDNA_PREFIX) === 0 ? punycode.decode(part.slice(IDNA_PREFIX.length)) : part)
    .join('.');
};

const getHostname = url => {
  const parser = document.createElement('a');
  parser.href = url;
  return parser.hostname;
};

const trim = (text, len) => {
  const cut = text.indexOf(' ', len);

  if (cut === -1) {
    return text;
  }

  return text.substring(0, cut) + (text.length > len ? '…' : '');
};

const domParser = new DOMParser();

const addAutoPlay = html => {
  const document = domParser.parseFromString(html, 'text/html').documentElement;
  const iframe = document.querySelector('iframe');

  if (iframe) {
    if (iframe.src.indexOf('?') !== -1) {
      iframe.src += '&';
    } else {
      iframe.src += '?';
    }

    iframe.src += 'autoplay=1&auto_play=1';

    // DOM parser creates html/body elements around original HTML fragment,
    // so we need to get innerHTML out of the body and not the entire document
    return document.querySelector('body').innerHTML;
  }

  return html;
};

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('nodeRef') nodeRef: ElementRef<HTMLElement>;

  @Input() card: any;
  @Input() maxDescription: number = 50;
  @Input() onOpenMedia: (obj: object, index: number) => void;
  @Input() compact: boolean = false;
  @Input() defaultWidth: number;
  @Input() cacheWidth: (width: number) => void;
  @Input() sensitive: boolean;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.width = this.defaultWidth || 280;
    this.revealed = !this.sensitive;

    this.provider = this.card.providerName.length === 0 ? decodeIDNA(getHostname(this.card.url)) : this.card.providerName;
    this.horizontal = (!this.compact && this.card.width > this.card.height && (this.card.width + 100 >= this.width)) || this.card.type !== 'link' || this.embedded;
    this.interactive = this.card.type !== 'link';
    this.className = {
      'status-card': true,
      horizontal: this.horizontal,
      compact: this.compact,
      interactive: this.interactive
    };
    this.ratio = this.card.width / this.card.height;
    this.height = (this.compact && !this.embedded) ? (this.width / (16 / 9)) : (this.width / this.ratio);

    if (this.embedded) {
      this.videoContent = {__html: addAutoPlay(this.card.html)};
      let width = this.width;
      let ratio = this.card.width / this.card.height;
      this.videoHeight = width / ratio;
    }
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', this.handleResize, {passive: true});

    this.node = this.nodeRef.nativeElement;

    if (this.node) {
      this._setDimensions();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  node = null;

  // state
  width = 280;
  previewLoaded = false;
  embedded = false;
  revealed: boolean;

  // render
  provider: string;
  horizontal: boolean;
  interactive: boolean;
  className: {};
  title;
  ratio: number;
  height: number;

  videoContent: any;
  videoHeight: number;

  faSearchPlus = faSearchPlus;
  faExternalLink = faExternalLink;
  faFileAlt = faFileAlt;
  faPlay = faPlay;

  handleResize = debounce(() => {
    if (this.node) {
      this._setDimensions();
    }
  }, 250, {
    trailing: true,
  });

  handlePhotoClick = () => {
    this.onOpenMedia(
      fromJS([      // Immutable.
        {
          type: 'image',
          url: this.card.get('embed_url'),
          description: this.card.get('title'),
          meta: {
            original: {
              width: this.card.get('width'),
              height: this.card.get('height'),
            },
          },
        },
      ]),
      0,
    );
  }

  handleEmbedClick = () => {
    if (this.card.get('type') === 'photo') {
      this.handlePhotoClick();
    } else {
      this.embedded = true;
    }
  }

  handleImageLoad = () => {
    this.previewLoaded = true;
  }

  handleReveal = e => {
    e.preventDefault();
    e.stopPropagation();

    this.revealed = true;
  }

  getCardDescription() {
    return trim(this.card.description || '', this.maxDescription);
  }

  private _setDimensions() {
    const width = this.node.offsetWidth;

    if (this.cacheWidth) {
      this.cacheWidth(width);
    }

    this.width = width;

  }

}
