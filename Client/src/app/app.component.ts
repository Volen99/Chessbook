import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyticsService} from './core/utils';
import {InitUserService} from './theme/services/init-user.service';
import {Subject} from 'rxjs';
import {filter, pairwise, takeUntil, takeWhile} from 'rxjs/operators';
import {
  GuardsCheckStart,
  NavigationEnd,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  Event,
  Scroll
} from "@angular/router";
import {NbMenuItem} from "./sharebook-nebular/theme/components/menu/menu.service";
import {NbTokenService} from "./sharebook-nebular/auth/services/token/token.service";
import {PagesMenu} from "./pages/pages-menu";
import {ViewportScroller} from "@angular/common";
import {ScreenService} from "./core/wrappers/screen.service";
import {HttpClient} from "@angular/common/http";
import {IPoll} from "./shared/posts/models/poll/poll";
import {environment} from "../environments/environment";
import {IUser} from "./core/interfaces/common/users";
import {NbIconLibraries} from "./sharebook-nebular/theme/components/icon/icon-libraries";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private viewportScroller: ViewportScroller,
              private pagesMenu: PagesMenu,
              private tokenService: NbTokenService,
              private initUserService: InitUserService,
              private iconLibraries: NbIconLibraries,
              /* private analytics: AnalyticsService,*/) {

    // this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
    // this.iconLibraries.setDefaultPack('font-awesome'); // <---- set as default

    this.iconLibraries.registerFontPack('solid', {packClass: 'fas', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('regular', {packClass: 'far', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('light', {packClass: 'fal', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('duotone', {packClass: 'fad', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('brands', {packClass: 'fab', iconClassPrefix: 'fa'});

    // this.iconLibraries.setDefaultPack('duotone');

    this.initUser();

    // this.initMenu(); // comment coz of user.screenName for :profile

    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.initMenu();
      });
  }

  menu: NbMenuItem[];
  alive: boolean = true;

  ngOnInit(): void {
    document.getElementById('incompatible-browser').className += ' browser-ok';
  }

  user: IUser;

  public isAdmin = false;

  initUser() {
    this.initUserService.initCurrentUser()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.user = data;
        this.initMenu();

      });
  }

  initMenu() {
    this.pagesMenu.getMenu(this.user?.screenName)
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

    // // Homepage redirection
    // navigationEndEvent.pipe(
    //   map(() => window.location.pathname),
    //   filter(pathname => !pathname || pathname === '/' || is18nPath(pathname))
    // ).subscribe(() => this.redirectService.redirectToHomepage(true));
    //
    // // Plugin hooks
    // navigationEndEvent.subscribe(e => {
    //   this.hooks.runAction('action:router.navigation-end', 'common', {path: e.url});
    // });

    // // Automatically hide/display the menu
    // eventsObs.pipe(
    //   filter((e: Event): e is GuardsCheckStart => e instanceof GuardsCheckStart),
    //   filter(() => this.screenService.isInSmallView() || this.screenService.isInTouchScreen())
    // ).subscribe(() => this.menu.setMenuDisplay(false)); // User clicked on a link in the menu, change the page
    //
    // // Handle lazy loaded module
    // eventsObs.pipe(
    //   filter((e: Event): e is RouteConfigLoadStart => e instanceof RouteConfigLoadStart)
    // ).subscribe(() => this.loadingBar.useRef().start());
    //
    // eventsObs.pipe(
    //   filter((e: Event): e is RouteConfigLoadEnd => e instanceof RouteConfigLoadEnd)
    // ).subscribe(() => this.loadingBar.useRef().complete());
}
