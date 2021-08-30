import {Component, OnDestroy, OnInit, Optional} from '@angular/core';
import {Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {Subject} from 'rxjs';
import {takeUntil, takeWhile} from 'rxjs/operators';
import {Hotkey, HotkeysService} from "angular2-hotkeys";

import {InitUserService} from './theme/services/init-user.service';
import {NbMenuItem} from "./sharebook-nebular/theme/components/menu/menu.service";
import {NbTokenService} from "./sharebook-nebular/auth/services/token/token.service";
import {PagesMenu} from "./pages/pages-menu";
import {IUser} from "./core/interfaces/common/users";
import {NbIconLibraries} from "./sharebook-nebular/theme/components/icon/icon-libraries";
import { NbDialogService } from './sharebook-nebular/theme/components/dialog/dialog.service';
import {UploadComponent} from "./pages/modal-overlays/dialog/compose/upload/upload.component";
import {NbDialogRef} from "./sharebook-nebular/theme/components/dialog/dialog-ref";
import {User} from "./shared/shared-main/user/user.model";
import {HooksService} from "./core/plugins";

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
              private hotkeysService: HotkeysService,
              private dialogService: NbDialogService,
              @Optional() protected ref: NbDialogRef<UploadComponent>) {

    this.iconLibraries.registerFontPack('solid', {packClass: 'fas', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('regular', {packClass: 'far', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('light', {packClass: 'fal', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('duotone', {packClass: 'fad', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('brands', {packClass: 'fab', iconClassPrefix: 'fa'});

    // this.iconLibraries.setDefaultPack('duotone');

    this.initMenu();

    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.initUser();
        this.initMenu();
      });
  }

  menu: NbMenuItem[];
  alive: boolean = true;

  isUserLoggedIn () {
   // return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    document.getElementById('incompatible-browser').className += ' browser-ok';

    // this.hooks.runAction('action:application.init', 'common');

    this.initHotkeys();
  }

  user: IUser;

  initUser() {
    this.initUserService.initCurrentUser()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.user = this.onUserFetched(data);
        this.initMenu();

      });
  }

  private onUserFetched (userJson: IUser) {
    return new User(userJson);
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

  private initHotkeys () {
    this.hotkeysService.add([
      new Hotkey('k', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/overview' ]);
        return false;
      }, undefined, `Previous Tweet`),

      new Hotkey('Space', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/trending' ]);
        return false;
      }, undefined, `Page down`),

      new Hotkey('.', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/recently-added' ]);
        return false;
      }, undefined, `Load new Posts`),

      new Hotkey('g h', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/home' ]);
        return false; // Prevent bubbling
      }, undefined, `Home`),

      new Hotkey('g e', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/explore' ]);
        return false;
      }, undefined, `Explore`),

      new Hotkey('g n', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/notifications' ]);
        return false;
      }, undefined, `Notifications`),

      new Hotkey('g r', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Mentions`),

      new Hotkey('g p', (event: KeyboardEvent): boolean => {
        this.router.navigate([ `/${this.user?.screenName.substring(1)}` ]);
        return false;
      }, undefined, `Profile`),

      new Hotkey('g l', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Likes`),

      new Hotkey('g i', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Lists`),

      new Hotkey('g m', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/messages' ]);
        return false;
      }, undefined, `Direct Messages`),

      new Hotkey('g s', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/my-account' ]);
        return false;
      }, undefined, `Settings`),

      new Hotkey('g t', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/streamers' ]);
        return false;
      }, undefined, `Streamers`),

      new Hotkey('g u', (event: KeyboardEvent): boolean => {
        let inputElement = document.getElementById('search-video') as HTMLInputElement;
        if (!inputElement) {
          return;
        }

        inputElement.focus();
        inputElement.value = '@';
        return false;
      }, undefined, `Go to user…`),

      new Hotkey('g c', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/ratings' ]);
        return false;
      }, undefined, `Chess rankings`),

      // Actions start 😎
      new Hotkey('n', (event: KeyboardEvent): boolean => {
        if (this.ref === null) {
          this.dialogService.open(UploadComponent, {
            closeOnEsc: true,
          });
          return false;
        }

        return;
      }, undefined, `New Post`),

      new Hotkey('CTRL Enter', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Send Tweet`),

      new Hotkey('m', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `New Direct Message`),

      new Hotkey('/', (event: KeyboardEvent): boolean => {
        document.getElementById('search-video').focus();
        return false;
      }, undefined, `Focus the search bar`),

      new Hotkey('l', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Like`),

      new Hotkey('r', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Reply`),

      new Hotkey('t', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Retweet`),

      new Hotkey('s', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Share Tweet`),

      new Hotkey('b', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Bookmark`),

      new Hotkey('u', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Mute account`),

      new Hotkey('x', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Block account`),

      new Hotkey('Enter', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Open Tweet details`),

      new Hotkey('o', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Expand photo`),

      new Hotkey('i', (event: KeyboardEvent): boolean => {
        this.router.navigate([ '/videos/upload' ]);
        return false;
      }, undefined, `Open/Close Messages dock`),
    ]);
  }
}
