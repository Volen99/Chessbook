import {ActivatedRoute} from '@angular/router';
import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ViewportScroller} from '@angular/common';

import {NbToastrService} from '../sharebook-nebular/theme/components/toastr/toastr.service';
import {ServerService} from '../core/server/server.service';
import {About} from '../shared/models/server/about.model';
import {copyToClipboard} from '../../root-helpers/utils';
import {NbGlobalPhysicalPosition} from '../sharebook-nebular/theme/components/cdk/overlay/position-helper';
import {NbDialogService} from '../sharebook-nebular/theme/components/dialog/dialog.service';
import {VideosDialogComponent} from '../shared/videos/videos-dialog.component';
import {MarkdownService} from '../core/renderer/markdown.service';

export interface IDonateButton {
  class: 'patreon' | 'ko-fi' | 'streamlabs' | 'paypal' | 'google-pay' | 'bitcoin-btc' | 'bitcoin-cash' | 'dogecoin';
  ariaLabel: 'patreon' | 'ko-fi' | 'streamlabs' | 'paypal' | 'google pay' | 'bitcoin btc' | 'bitcoin cash' | 'dogecoin';
  src: string;
  alt: string;
  href: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit, AfterViewChecked {
  @ViewChild('descriptionWrapper') descriptionWrapper: ElementRef<HTMLInputElement>;

  shortDescription = '';
  descriptionContent: string;

  donateButtons: IDonateButton[];

  html = {
    terms: '',
    codeOfConduct: '',
    moderationInformation: '',
    administrator: '',
    creationReason: '',
    maintenanceLifetime: '',
    businessModel: '',
    hardwareInformation: ''
  };

  languages: string[] = [];
  categories: string[] = [];

  initialized = false;

  today: Date;
  chessbookFounded: Date = new Date('11/1/2021');
  differenceInDays: number;

  private lastScrollHash: string;

  constructor(
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private notifier: NbToastrService,
    private serverService: ServerService,
    private dialogService: NbDialogService,
    private markdownService: MarkdownService) {
  }

  async ngOnInit() {
    this.donateButtons = [
      {
        ariaLabel: 'patreon',
        src: '/assets/images/patreon.png',
        alt: 'patreon',
        class: 'patreon',
        href: 'https://www.patreon.com/volen_dyulgerov',
      },
      {
        ariaLabel: 'ko-fi',
        src: '/assets/images/ko-fi.png',
        alt: 'ko-fi',
        class: 'ko-fi',
        href: 'https://ko-fi.com/volen'
      },
      {
        ariaLabel: 'streamlabs',
        src: '/assets/images/streamlabs.png',
        alt: 'streamlabs',
        class: 'streamlabs',
        href: 'https://streamlabs.com/volencho/tip'
      },
      {
        ariaLabel: 'paypal',
        src: '/assets/images/paypal.svg',
        alt: 'paypal',
        class: 'paypal',
        href: 'https://www.paypal.com/donate?hosted_button_id=3WNBVEHBX7UNG'
      },
    ];

    let about: About = {
      instance: {
        name: 'Chessbook',
        shortDescription: '',
        description: `I created Chessbook to provide a free social media for chess users.`,
        terms: '',
        codeOfConduct: 'Code of conduct',
        moderationInformation: `We are strong believers in free speech, and do not seek to limit the content you can post.
          However, we need to balance this with our our legal and moral obligations. 
          Below is a summary of rules you need to follow:`,
        administrator: 'My name is Volen but friends call me Volencho. I am a developer from Bulgaria, ' +
          'with love for the game of chess. I made this website all by myself. Apart from spending time with friends and family, ' +
          'I love Music, Reading, Astronomy, Science, Artificial Intelligence, Physics, Traveling, Video Games, Movies and the list goes on :D. I am also a stargaze lover 🌟🌠',
        creationReason: '',
        maintenanceLifetime: '',
        businessModel: 'Currently, the website is financed using my own money. However, I welcome support to help covering my ' +
          'costs. Details of ways to help are shown in the Information section below',
        hardwareInformation: '',

        languages: [],
        categories: [],
      }
    };

    this.shortDescription = about.instance.shortDescription;
    this.descriptionContent = about.instance.description;

    this.html = await this.buildHtml(about);

    this.today = new Date();

    const diffTime = Math.abs(this.today.getTime() - this.chessbookFounded.getTime());
    this.differenceInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    this.initialized = true;
  }

  ngAfterViewChecked() {
    if (this.initialized && window.location.hash && window.location.hash !== this.lastScrollHash) {
      this.viewportScroller.scrollToAnchor(window.location.hash.replace('#', ''));

      this.lastScrollHash = window.location.hash;
    }
  }

  onClickCopyLink(anchor: HTMLAnchorElement) {
    const link = anchor.href;
    copyToClipboard(link);

    this.notifier.success(`Link copied`, 'Success', {
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    });
  }

  openVideoModal() {
    this.dialogService.open(VideosDialogComponent, {
      context: {
        isOpen: true,
      },
      closeOnEsc: true,
      closeOnBackdropClick: false,
    });
  }

  async buildHtml(about: About) {
    const html = {
      terms: '',
      codeOfConduct: '',
      moderationInformation: '',
      administrator: '',
      creationReason: '',
      maintenanceLifetime: '',
      businessModel: '',
      hardwareInformation: ''
    };

    for (const key of Object.keys(html)) {
      html[key] = await this.markdownService.textMarkdownToHTML(about.instance[key]);
    }

    return html;
  }

  get isBroadcastMessageDisplayed() {
    return false;
  }
}
