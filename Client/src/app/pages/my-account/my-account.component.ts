import {Component, OnInit} from '@angular/core';

import {
    faUserTimes,
} from '@fortawesome/pro-light-svg-icons';

import {ScreenService} from "../../core/wrappers/screen.service";
import {AuthUser} from "../../core/auth/auth-user.model";
import {TopMenuDropdownParam} from "../../shared/shared-main/misc/top-menu-dropdown.component";

@Component({
    selector: 'my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
    // menuEntries: TopMenuDropdownParam[] = [];
    user: AuthUser;


    constructor(private screenService: ScreenService) {
    }

    get isBroadcastMessageDisplayed() {
        return this.screenService.isBroadcastMessageDisplayed;
    }

    ngOnInit(): void {
        this.buildMenu();
    }

    menuEntries: TopMenuDropdownParam[] = [];

    private buildMenu() {
        const moderationEntries: TopMenuDropdownParam = {
            label: `Moderation`,
            children: [
                {
                    label: `Blocked accounts`,
                    routerLink: '/my-account/blocklist/accounts',
                    iconName: faUserTimes,
                },
                // {
                //     label: `Abuse reports`,
                //     routerLink: '/my-account/abuses',
                //     iconName: faFlag,
                // }
            ]
        };

        this.menuEntries = [
            {
                label: `Settings`,
                routerLink: '/my-account/settings'
            },
            moderationEntries,
            {
                label: 'Your data',
                routerLink: '/my-account/download_your_data',
            },
        ];
    }
}
