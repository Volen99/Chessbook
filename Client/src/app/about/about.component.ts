import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HTMLServerConfig} from '../shared/models/server/server-config.model';
import {ViewportScroller} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {NbToastrService} from '../sharebook-nebular/theme/components/toastr/toastr.service';
import {ServerService} from '../core/server/server.service';
import {InstanceService} from '../shared/shared-instance/instance.service';
import {About} from '../shared/models/server/about.model';
import {copyToClipboard} from '../../root-helpers/utils';
import {NbGlobalPhysicalPosition} from '../sharebook-nebular/theme/components/cdk/overlay/position-helper';
import {NbDialogService} from '../sharebook-nebular/theme/components/dialog/dialog.service';
import {VideosDialogComponent} from '../shared/videos/videos-dialog.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit, AfterViewChecked {
  @ViewChild('descriptionWrapper') descriptionWrapper: ElementRef<HTMLInputElement>;
  //  @ViewChild('contactAdminModal', {static: true}) contactAdminModal: ContactAdminModalComponent;

  shortDescription = '';
  descriptionContent: string;

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

  private serverConfig: HTMLServerConfig;

  private lastScrollHash: string;

  constructor(
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private notifier: NbToastrService,
    private serverService: ServerService,
    private instanceService: InstanceService,
    private dialogService: NbDialogService,
  ) {
  }

  get instanceName() {
    return 'Chessbook';
  }

  get isContactFormEnabled() {
    return true; // this.serverConfig.email.enabled && this.serverConfig.contactForm.enabled;
  }

  get isNSFW() {
    return false; //  this.serverConfig.instance.isNSFW;
  }

  async ngOnInit() {
    // const {about, languages, categories}: ResolverData = this.route.snapshot.data.instanceData;

    // // this.serverConfig = this.serverService.getHTMLConfig();
    //
    // this.route.data.subscribe(data => {
    //   if (!data?.isContact) return;
    //
    //   const prefill = this.route.snapshot.queryParams;
    //
    //   // this.contactAdminModal.show(prefill);
    // });
    //
    // this.languages = languages;
    // this.categories = categories;

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
          'with love for the game of chess. I made this website all by myself. Apart from spending time with family, ' +
          'I love Music, Astronomy, Science, Artificial Intelligence, Physics, Traveling, Video Games and the list goes on :D. I am also a stargaze lover 🌟🌠',
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

    this.html = await this.instanceService.buildHtml(about);

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

  get isBroadcastMessageDisplayed() {
    return false;
    // return this.screenService.isBroadcastMessageDisplayed;
  }
}
