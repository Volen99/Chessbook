import {ViewportScroller} from '@angular/common';
import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AboutInstanceResolver, ResolverData} from './about-instance.resolver';
import {HTMLServerConfig} from "../../shared/models/server/server-config.model";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {ServerService} from "../../core/server/server.service";
import {copyToClipboard} from "../../../root-helpers/utils";
import {InstanceService} from "../../shared/shared-instance/instance.service";
import {About} from "../../shared/models/server/about.model";
import {NbGlobalPhysicalPosition} from "../../sharebook-nebular/theme/components/cdk/overlay/position-helper";

@Component({
  selector: 'my-about-instance',
  templateUrl: './about-instance.component.html',
  styleUrls: ['./about-instance.component.scss'],
  providers: [AboutInstanceResolver],
})
export class AboutInstanceComponent implements OnInit, AfterViewChecked {
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

  private serverConfig: HTMLServerConfig;

  private lastScrollHash: string;

  constructor(
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private notifier: NbToastrService,
    private serverService: ServerService,
    private instanceService: InstanceService
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
        administrator: 'My name is Volen but friends call me Volencho. I am self-made Full Stack Developer from Bulgaria, ' +
          'with love for the game of chess. I made this website all by myself (99.99%). I am also a stargaze lover 🌟🌠',
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
}
