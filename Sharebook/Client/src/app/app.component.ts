import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyticsService} from './core/utils';
import {InitUserService} from './theme/services/init-user.service';
import {Subject} from 'rxjs';
import {filter, takeUntil, takeWhile} from 'rxjs/operators';
import {Router} from "@angular/router";
import {NbMenuItem} from "./sharebook-nebular/theme/components/menu/menu.service";
import {NbTokenService} from "./sharebook-nebular/auth/services/token/token.service";
import {PagesMenu} from "./pages/pages-menu";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private pagesMenu: PagesMenu,
              private tokenService: NbTokenService,
              private initUserService: InitUserService,
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
}