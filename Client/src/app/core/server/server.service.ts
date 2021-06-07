import {Observable, of, Subject} from 'rxjs';
import {first, map, share, shareReplay, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ServerConfig} from "../../shared/models/server/server-config.model";

@Injectable()
export class ServerService {
  private static BASE_CONFIG_URL = environment.apiUrl + '/api/v1/config/';
  private static BASE_VIDEO_URL = environment.apiUrl + '/api/v1/videos/';
  private static BASE_VIDEO_PLAYLIST_URL = environment.apiUrl + '/api/v1/video-playlists/';
  private static BASE_LOCALE_URL = environment.apiUrl + '/client/locales/';
  private static BASE_STATS_URL = environment.apiUrl + '/api/v1/server/stats';

  configReloaded = new Subject<ServerConfig>();

  private localeObservable: Observable<any>;
  private configObservable: Observable<ServerConfig>;

  private configReset = false;

  private configLoaded = false;
  private config: ServerConfig = {
    instance: {
      name: 'Chessbook',
      shortDescription: 'Chessbook, a social media for chess players  ' +
        'using C# and Angular.',
      isNSFW: false,
      defaultNSFWPolicy: 'do_not_list' as 'do_not_list',
      defaultClientRoute: '',
      customizations: {
        javascript: '',
        css: ''
      }
    },
    plugin: {
      registered: [],
      registeredExternalAuths: [],
      registeredIdAndPassAuths: []
    },
    theme: {
      registered: [],
      default: 'default'
    },
    email: {
      enabled: false
    },
    contactForm: {
      enabled: false
    },
    serverVersion: 'Unknown',
    signup: {
      allowed: false,
      allowedForCurrentIP: false,
      requiresEmailVerification: false
    },
    transcoding: {
      profile: 'default',
      availableProfiles: ['default'],
      enabledResolutions: [],
      hls: {
        enabled: false
      },
      webtorrent: {
        enabled: true
      }
    },
    live: {
      enabled: false,
      allowReplay: true,
      maxDuration: null,
      maxInstanceLives: -1,
      maxUserLives: -1,
      transcoding: {
        enabled: false,
        profile: 'default',
        availableProfiles: ['default'],
        enabledResolutions: []
      },
      rtmp: {
        port: 1935
      }
    },
    avatar: {
      file: {
        size: {max: 0},
        extensions: []
      }
    },
    banner: {
      file: {
        size: {max: 0},
        extensions: []
      }
    },
    video: {
      image: {
        size: {max: 0},
        extensions: []
      },
      file: {
        extensions: []
      }
    },
    videoCaption: {
      file: {
        size: {max: 0},
        extensions: []
      }
    },
    user: {
      videoQuota: -1,
      videoQuotaDaily: -1
    },
    import: {
      videos: {
        http: {
          enabled: false
        },
        torrent: {
          enabled: false
        }
      }
    },
    trending: {
      videos: {
        intervalDays: 0,
        algorithms: {
          enabled: ['best', 'hot', 'most-viewed', 'most-liked'],
          default: 'most-viewed'
        }
      }
    },
    autoBlacklist: {
      videos: {
        ofUsers: {
          enabled: false
        }
      }
    },
    tracker: {
      enabled: true
    },
    followings: {
      instance: {
        autoFollowIndex: {
          indexUrl: 'https://instances.joinpeertube.org'
        }
      }
    },
    broadcastMessage: {
      enabled: false,
      message: '',
      level: 'info',
      dismissable: false
    },
    search: {
      remoteUri: {
        users: true,
        anonymous: false
      },
      searchIndex: {
        enabled: false,
        url: '',
        disableLocalSearch: false,
        isDefaultSearch: false
      }
    }
  };

  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private localeId: string
  ) {
    this.loadConfigLocally();
  }

  getServerVersionAndCommit() {
    const serverVersion = this.config.serverVersion;
    const commit = this.config.serverCommit || '';

    let result = serverVersion;
    if (commit) result += '...' + commit;

    return result;
  }

  resetConfig() {
    this.configLoaded = false;
    this.configReset = true;

    // Notify config update
    this.getConfig().subscribe(() => {
      // empty, to fire a reset config event
    });
  }

  getConfig() {
    if (this.configLoaded) return of(this.config);

    if (!this.configObservable) {
      this.configObservable = this.http.get<ServerConfig>(ServerService.BASE_CONFIG_URL)
        .pipe(
          tap(config => {
            this.config = config;
            this.configLoaded = true;
          }),
          tap(config => {
            if (this.configReset) {
              this.configReloaded.next(config);
              this.configReset = false;
            }
          }),
          share()
        );
    }

    return this.configObservable;
  }

  getTmpConfig() {
    return this.config;
  }

  private loadConfigLocally() {
    const configString = window['PeerTubeServerConfig'];
    if (!configString) return;

    try {
      const parsed = JSON.parse(configString);
      Object.assign(this.config, parsed);
    } catch (err) {
      console.error('Cannot parse config saved in from index.html.', err);
    }
  }
}
