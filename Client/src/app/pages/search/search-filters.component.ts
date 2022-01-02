import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {HTMLServerConfig} from "../../shared/models/server/server-config.model";
import {AdvancedSearch} from "../../shared/shared-search/advanced-search.model";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap/tooltip/tooltip";

type FormOption = { id: string, label: string };

@Component({
  selector: 'my-search-filters',
  styleUrls: ['./search-filters.component.scss'],
  templateUrl: './search-filters.component.html'
})
export class SearchFiltersComponent implements OnInit {
  @Input() advancedSearch: AdvancedSearch = new AdvancedSearch();

  @Output() filtered = new EventEmitter<AdvancedSearch>();

  publishedDateRanges: FormOption[] = [];
  sorts: FormOption[] = [];
  durationRanges: FormOption[] = [];
  videoType: FormOption[] = [];
  tooltips: string[] = [
      'querying the tablebase..',
      '197,742 possible games after move 2..',
      '121 million possible games after move 3..',
      'searching..',
      'awaiting orders..',
      'searching openings..',
      'searching middlegames..',
      'searching endgames..',
      'There are over 9 million different possible positions after three moveseach..',
      'There are over 318 billion different possible positions after four moves each..',
  ];

  publishedDateRange: string;
  durationRange: string;

  originallyPublishedStartYear: string;
  originallyPublishedEndYear: string;
  tooltip: string = 'querying the tablebase..';

  private serverConfig: HTMLServerConfig;

  constructor() {
    this.publishedDateRanges = [
      {
        id: 'today',
        label: `Today`
      },
      {
        id: 'last_7days',
        label: `Last 7 days`
      },
      {
        id: 'last_30days',
        label: `Last 30 days`
      },
      {
        id: 'last_365days',
        label: `Last 365 days`
      }
    ];

    this.videoType = [
      {
        id: 'vod',
        label: `VOD videos`
      },
      {
        id: 'live',
        label: `Live videos`
      }
    ];

    this.durationRanges = [
      {
        id: 'short',
        label: `Short (< 4 min)`
      },
      {
        id: 'medium',
        label: `Medium (4-10 min)`
      },
      {
        id: 'long',
        label: `Long (> 10 min)`
      }
    ];

    this.sorts = [
      {
        id: '-match',
        label: `Relevance`
      },
      {
        id: '-createdOn',
        label: `Publish date`
      },
      {
        id: '-likes',
        label: `Likes`
      }
    ];
  }

  private htmlConfig = {
    autoBlacklist: {videos: {ofUsers: {enabled: false}}},
    avatar: {file: {extensions: [], size: {max: 0}}},
    banner: {file: {extensions: [], size: {max: 0}}},
    broadcastMessage: {dismissable: false, enabled: false, level: undefined, message: ""},
    contactForm: {enabled: false},
    email: {enabled: false},
    followings: {instance: {autoFollowIndex: {indexUrl: ""}}},
    import: {videos: {http: {enabled: false}, torrent: {enabled: false}}},
    instance: {
      customizations: {css: "", javascript: ""},
      defaultClientRoute: "",
      defaultNSFWPolicy: undefined,
      isNSFW: false,
      name: "",
      shortDescription: ""
    },
    live: {
      allowReplay: false,
      enabled: false,
      maxDuration: 0,
      maxInstanceLives: 0,
      maxUserLives: 0,
      rtmp: {port: 0},
      transcoding: {availableProfiles: [], enabled: false, enabledResolutions: [], profile: ""}
    },
    plugin: {registered: [], registeredExternalAuths: [], registeredIdAndPassAuths: []},
    search: {
      remoteUri: {
        users: true,
        anonymous: false,
      },
      searchIndex: {
        enabled: false,
        url: '',
        disableLocalSearch: false,
        isDefaultSearch: false,
      }
    },
    serverVersion: "",
    theme: {default: "", registered: []},
    tracker: {enabled: false},
    transcoding: {
      availableProfiles: [],
      enabledResolutions: [],
      hls: {enabled: false},
      profile: "",
      webtorrent: {enabled: false}
    },
    trending: {videos: {algorithms: {default: "", enabled: []}, intervalDays: 0}},
    user: {videoQuota: 0, videoQuotaDaily: 0},
    video: {file: {extensions: []}, image: {extensions: [], size: {max: 0}}},
    videoCaption: {file: {extensions: [], size: {max: 0}}}

  };

  ngOnInit() {
    this.serverConfig = this.htmlConfig;

    this.loadFromDurationRange();
    this.loadFromPublishedRange();
    this.loadOriginallyPublishedAtYears();

    this.handleImgClick();

  }

  onDurationOrPublishedUpdated() {
    this.updateModelFromPublishedRange();
  }

  formUpdated() {
    this.onDurationOrPublishedUpdated();
    this.advancedSearch.originallyPublishedStartDate = this.originallyPublishedStartYear;
    this.advancedSearch.originallyPublishedEndDate = this.originallyPublishedEndYear;
    this.filtered.emit(this.advancedSearch);
  }

  reset() {
    this.advancedSearch.reset();

    this.resetOriginalPublicationYears();

    this.durationRange = undefined;
    this.publishedDateRange = undefined;

    this.onDurationOrPublishedUpdated();
  }

  resetField(fieldName: string, value?: any) {
    this.advancedSearch[fieldName] = value;
  }

  resetLocalField(fieldName: string, value?: any) {
    this[fieldName] = value;
    this.onDurationOrPublishedUpdated();
  }

  resetOriginalPublicationYears() {
    this.originallyPublishedStartYear = this.originallyPublishedEndYear = undefined;
  }

  isSearch = true;
  handleImgClick(tooltipEl?: NgbTooltip) {
    debugger
    this.isSearch = !this.isSearch;
    this.tooltip = this.tooltips[Math.floor(Math.random() * this.tooltips.length)];
    if (tooltipEl) tooltipEl.toggle();
  }

  private loadOriginallyPublishedAtYears() {
    this.originallyPublishedStartYear = this.advancedSearch.originallyPublishedStartDate;
      // ? new Date(this.advancedSearch.originallyPublishedStartDate).getFullYear().toString()
      // : null;

    this.originallyPublishedEndYear = this.advancedSearch.originallyPublishedEndDate;
      // ? new Date(this.advancedSearch.originallyPublishedEndDate).getFullYear().toString()
      // : null;
  }

  private loadFromDurationRange() {
    if (this.advancedSearch.durationMin || this.advancedSearch.durationMax) {
      const fourMinutes = 60 * 4;
      const tenMinutes = 60 * 10;

      if (this.advancedSearch.durationMin === fourMinutes && this.advancedSearch.durationMax === tenMinutes) {
        this.durationRange = 'medium';
      } else if (this.advancedSearch.durationMax === fourMinutes) {
        this.durationRange = 'short';
      } else if (this.advancedSearch.durationMin === tenMinutes) {
        this.durationRange = 'long';
      }
    }
  }

  private loadFromPublishedRange() {
    if (this.advancedSearch.startDate) {
      const date = new Date(this.advancedSearch.startDate);
      const now = new Date();

      const diff = Math.abs(date.getTime() - now.getTime());

      const dayMS = 1000 * 3600 * 24;
      const numberOfDays = diff / dayMS;

      if (numberOfDays >= 365) this.publishedDateRange = 'last_365days';
      else if (numberOfDays >= 30) this.publishedDateRange = 'last_30days';
      else if (numberOfDays >= 7) this.publishedDateRange = 'last_7days';
      else if (numberOfDays >= 0) this.publishedDateRange = 'today';
    }
  }

  private updateModelFromPublishedRange() {
    if (!this.publishedDateRange) return;

    // today
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    switch (this.publishedDateRange) {
      case 'last_7days':
        date.setDate(date.getDate() - 7);
        break;

      case 'last_30days':
        date.setDate(date.getDate() - 30);
        break;

      case 'last_365days':
        date.setDate(date.getDate() - 365);
        break;
    }

    this.advancedSearch.startDate = date.toLocaleDateString(); // date.toISOString();
  }
}
