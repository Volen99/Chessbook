import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {concat} from 'rxjs';
import {filter, first, map, pairwise} from 'rxjs/operators';
import {DOCUMENT, PlatformLocation, ViewportScroller} from '@angular/common';
import {AfterViewInit, Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Event, GuardsCheckStart, NavigationEnd, Router, Scroll} from '@angular/router';
import {MenuService} from './core/menu/menu.service';
import {WelcomeModalComponent} from "./modal/welcome-modal.component";
import {InstanceConfigWarningModalComponent} from "./modal/instance-config-warning-modal.component";
import {CustomModalComponent} from "./modal/custom-modal.component";
import {ServerConfig} from "./shared/models/server/server-config.model";
import {HooksService, PluginService} from "./core/plugins";
import {InstanceService} from "./shared/shared-instance/instance.service";
import {NgbConfig, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {POP_STATE_MODAL_DISMISS} from "./helpers/constants";
import {getShortLocale, is18nPath} from "./shared/core-utils/i18n/i18n";
import {peertubeLocalStorage} from "../root-helpers/sharebook-web-storage";
import {BroadcastMessageLevel} from "./shared/models/server/broadcast-message-level.type";
import {UserRole} from "./shared/models/users/user-role";
import {AuthService} from "./core/auth/auth.service";
import {ServerService} from "./core/server";
import {RedirectService} from "./core/routing/redirect.service";
import {ScreenService} from "./core/wrappers/screen.service";
import {ThemeService} from "./core/theme";
import {MarkdownService} from "./core/renderer/markdown.service";
import {User} from "./core/users/user.model";

// This is our Main Method where everything starts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/site.css', './app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  private static BROADCAST_MESSAGE_KEY = 'app-broadcast-message-dismissed';

  @ViewChild('welcomeModal') welcomeModal: WelcomeModalComponent;
  @ViewChild('instanceConfigWarningModal') instanceConfigWarningModal: InstanceConfigWarningModalComponent;
  @ViewChild('customModal') customModal: CustomModalComponent;

  customCSS: SafeHtml;
  broadcastMessage: { message: string, dismissable: boolean, class: string } | null = null;

  private serverConfig: ServerConfig;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private authService: AuthService,
    private serverService: ServerService,
    private pluginService: PluginService,
    private instanceService: InstanceService,
    private domSanitizer: DomSanitizer,
    private redirectService: RedirectService,
    private screenService: ScreenService,
    private hotkeysService: HotkeysService,
    private themeService: ThemeService,
    private hooks: HooksService,
    private location: PlatformLocation,
    private modalService: NgbModal,
    private markdownService: MarkdownService,
    private ngbConfig: NgbConfig,
    public menu: MenuService
  ) {
    this.ngbConfig.animation = false;
  }

  get instanceName() {
    return this.serverConfig.instance.name;
  }

  get defaultRoute() {
    return RedirectService.DEFAULT_ROUTE;
  }

  ngOnInit() {
    document.getElementById('incompatible-browser').className += ' browser-ok';

    this.serverConfig = this.serverService.getTmpConfig();
    this.serverService.getConfig()
      .subscribe(config => this.serverConfig = config);

    this.themeService.initialize();

    this.authService.loadClientCredentials();

    if (this.isUserLoggedIn()) {
      // The service will automatically redirect to the login page if the token is not valid anymore
      this.authService.refreshUserInformation();
    }

    this.initHotkeys();

    this.location.onPopState(() => this.modalService.dismissAll(POP_STATE_MODAL_DISMISS));

    this.document.documentElement.lang = getShortLocale(this.localeId);
  }

  ngAfterViewInit() {
    this.pluginService.initializeCustomModal(this.customModal);
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  hideBroadcastMessage() {
    peertubeLocalStorage.setItem(AppComponent.BROADCAST_MESSAGE_KEY, this.serverConfig.broadcastMessage.message);

    this.broadcastMessage = null;
    this.screenService.isBroadcastMessageDisplayed = false;
  }

  private initRouteEvents() {
    let resetScroll = true;
    const eventsObs = this.router.events;

    const scrollEvent = eventsObs.pipe(filter((e: Event): e is Scroll => e instanceof Scroll));

    scrollEvent.subscribe(e => {
      // scrollToAnchor first to preserve anchor position when using history navigation
      if (e.anchor) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(e.anchor);
        });

        return;
      }

      if (e.position) {
        return this.viewportScroller.scrollToPosition(e.position);
      }

      if (resetScroll) {
        return this.viewportScroller.scrollToPosition([0, 0]);
      }
    });

    const navigationEndEvent = eventsObs.pipe(filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd));

    // When we add the a-state parameter, we don't want to alter the scroll
    navigationEndEvent.pipe(pairwise())
      .subscribe(([e1, e2]) => {
        try {
          resetScroll = false;

          const previousUrl = new URL(window.location.origin + e1.urlAfterRedirects);
          const nextUrl = new URL(window.location.origin + e2.urlAfterRedirects);

          if (previousUrl.pathname !== nextUrl.pathname) {
            resetScroll = true;
            return;
          }

          const nextSearchParams = nextUrl.searchParams;
          nextSearchParams.delete('a-state');

          const previousSearchParams = previousUrl.searchParams;

          nextSearchParams.sort();
          previousSearchParams.sort();

          if (nextSearchParams.toString() !== previousSearchParams.toString()) {
            resetScroll = true;
          }
        } catch (e) {
          console.error('Cannot parse URL to check next scroll.', e);
          resetScroll = true;
        }
      });

    navigationEndEvent.pipe(
      map(() => window.location.pathname),
      filter(pathname => !pathname || pathname === '/' || is18nPath(pathname))
    ).subscribe(() => this.redirectService.redirectToHomepage(true));

    navigationEndEvent.subscribe(e => {
      this.hooks.runAction('action:router.navigation-end', 'common', {path: e.url});
    });

    eventsObs.pipe(
      filter((e: Event): e is GuardsCheckStart => e instanceof GuardsCheckStart),
      filter(() => this.screenService.isInSmallView() || this.screenService.isInTouchScreen())
    ).subscribe(() => this.menu.setMenuDisplay(false)); // User clicked on a link in the menu, change the page
  }

  private async _openAdminModalsIfNeeded(user: User) {
    if (user.noWelcomeModal !== true) {
      return this.welcomeModal.show();
    }

    if (user.noInstanceConfigWarningModal === true || !this.serverConfig.signup.allowed) {
      return;
    }

    this.instanceService.getAbout()
      .subscribe(about => {
        if (
          this.serverConfig.instance.name.toLowerCase() === 'peertube' ||
          !about.instance.terms ||
          !about.instance.administrator ||
          !about.instance.maintenanceLifetime
        ) {
          this.instanceConfigWarningModal.show(about);
        }
      });
  }

  private initHotkeys() {
    this.hotkeysService.add([
      new Hotkey(['/', 's'], (event: KeyboardEvent): boolean => {
        document.getElementById('search-video').focus();
        return false;
      }, undefined, $localize`Focus the search bar`),

      new Hotkey('b', (event: KeyboardEvent): boolean => {
        this.menu.toggleMenu();
        return false;
      }, undefined, $localize`Toggle the left menu`),

      new Hotkey('g o', (event: KeyboardEvent): boolean => {
        this.router.navigate(['/videos/overview']);
        return false;
      }, undefined, $localize`Go to the discover videos page`),

      new Hotkey('g t', (event: KeyboardEvent): boolean => {
        this.router.navigate(['/videos/trending']);
        return false;
      }, undefined, $localize`Go to the trending videos page`),

      new Hotkey('g r', (event: KeyboardEvent): boolean => {
        this.router.navigate(['/videos/recently-added']);
        return false;
      }, undefined, $localize`Go to the recently added videos page`),

      new Hotkey('g l', (event: KeyboardEvent): boolean => {
        this.router.navigate(['/videos/local']);
        return false;
      }, undefined, $localize`Go to the local videos page`),

      new Hotkey('g u', (event: KeyboardEvent): boolean => {
        this.router.navigate(['/videos/upload']);
        return false;
      }, undefined, $localize`Go to the videos upload page`)
    ]);
  }
}
