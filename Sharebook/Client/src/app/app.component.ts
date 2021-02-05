import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalyticsService} from './core/utils';
import {InitUserService} from './theme/services/init-user.service';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private router: Router, private analytics: AnalyticsService, private initUserService: InitUserService) {
        this.initUser();
    }

    ngOnInit(): void {
        this.analytics.trackPageViews();

        // omg... ♥
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
        ).subscribe(x => {
            this.isAdmin = this.router.url.includes('admin');
        });
    }

    public isAdmin = false;

    initUser() {
        this.initUserService.initCurrentUser()
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
