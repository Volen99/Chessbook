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
              private screenService: ScreenService,
              private http: HttpClient,
              /* private analytics: AnalyticsService,*/) {

    this.initUser();

    this.initMenu();

    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.initMenu();
      });
  }

  menu: NbMenuItem[];
  alive: boolean = true;

  ngOnInit(): void {
    // this.analytics.trackPageViews();

    this.initRouteEvents();


  }


  public isAdmin = false;

  initUser() {
    this.initUserService.initCurrentUser()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  initMenu() {
    this.pagesMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initRouteEvents() {
    let resetScroll = true;
    const eventsObs = this.router.events;

    const scrollEvent = eventsObs.pipe(filter((e: Event): e is Scroll => e instanceof Scroll));

    // Handle anchors/restore position
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
}
