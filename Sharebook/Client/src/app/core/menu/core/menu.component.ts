import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Inject,
  DoCheck,
  PLATFORM_ID,
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {animate, state, style, transition, trigger} from '@angular/animations';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil, filter, map} from 'rxjs/operators';

import {IUser} from "../../interfaces/common/users";
import {UserStore} from "../../stores/user.store";
import {MenuBag, MenuInternalService, MenuItem, MenuService} from "./menu.service";
import {NavigationEnd, NavigationExtras, Router} from "@angular/router";
import {convertToBoolProperty, SbBooleanInput} from "../../../helpers/utils";
import {NB_WINDOW, NbLayoutDirectionService} from "@nebular/theme";


export enum NbToggleStates {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
}

@Component({
  selector: '[app-menu-item]',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('toggle', [
      state(NbToggleStates.Collapsed, style({height: '0', margin: '0'})),
      state(NbToggleStates.Expanded, style({height: '*'})),
      transition(`${NbToggleStates.Collapsed} <=> ${NbToggleStates.Expanded}`, animate(300)),
    ]),
  ],
})
export class MenuItemComponent implements DoCheck, AfterViewInit, OnDestroy {
  @Input() menuItem = null as MenuItem;

  @Output() hoverItem = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();
  @Output() selectItem = new EventEmitter<any>();
  @Output() itemClick = new EventEmitter<any>();

  protected destroy$ = new Subject<void>();
  toggleState: NbToggleStates;

  constructor(protected menuService: MenuService,
              protected directionService: NbLayoutDirectionService) {
  }

  ngDoCheck() {
    this.toggleState = this.menuItem.expanded ? NbToggleStates.Expanded : NbToggleStates.Collapsed;
  }

  ngAfterViewInit() {
    this.menuService.onSubmenuToggle()
      .pipe(
        filter(({item}) => item === this.menuItem),
        map(({item}: MenuBag) => item.expanded),
        takeUntil(this.destroy$),
      )
      .subscribe(isExpanded => this.toggleState = isExpanded ? NbToggleStates.Expanded : NbToggleStates.Collapsed);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleSubMenu(item: MenuItem) {
    this.toggleSubMenu.emit(item);
  }

  onHoverItem(item: MenuItem) {
    this.hoverItem.emit(item);
  }

  onSelectItem(item: MenuItem) {
    this.selectItem.emit(item);
  }

  onItemClick(item: MenuItem) {
    this.itemClick.emit(item);
  }

  getExpandStateIcon(): string {
    if (this.menuItem.expanded) {
      return 'chevron-down-outline';
    }

    return this.directionService.isLtr()
      ? 'chevron-left-outline'
      : 'chevron-right-outline';
  }
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html', // omg, I must kill myself
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit,  OnDestroy {
  /**
   * Tags a menu with some ID, can be later used in the menu service
   * to determine which menu triggered the action, if multiple menus exist on the page.
   *
   * @type {string}
   */
  @Input() tag: string;

  /**
   * List of menu items.
   * @type List<NbMenuItem> | List<any> | any
   */
  @Input() items: MenuItem[];

  /**
   * Collapse all opened submenus on the toggle event
   * Default value is "false"
   * @type boolean
   */
  @Input()
  get autoCollapse(): boolean {
    return this._autoCollapse;
  }

  set autoCollapse(value: boolean) {
    this._autoCollapse = convertToBoolProperty(value);
  }

  protected _autoCollapse: boolean = false;
  static ngAcceptInputType_autoCollapse: SbBooleanInput;

  protected destroy$ = new Subject<void>();

  constructor(@Inject(NB_WINDOW) protected window,
              @Inject(PLATFORM_ID) protected platformId,
              protected menuInternalService: MenuInternalService,
              protected router: Router,
              protected userStore: UserStore) {

  }

  ngOnInit() {
    this.menuInternalService.prepareItems(this.items);

    this.menuInternalService
      .onAddItem()
      .pipe(
        filter((data: { tag: string; items: MenuItem[] }) => this.compareTag(data.tag)),
        takeUntil(this.destroy$),
      )
      .subscribe(data => this.onAddItem(data));

    this.menuInternalService
      .onNavigateHome()
      .pipe(
        filter((data: { tag: string; items: MenuItem[] }) => this.compareTag(data.tag)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.navigateHome());

    this.menuInternalService
      .onGetSelectedItem()
      .pipe(
        filter((data: { tag: string; listener: BehaviorSubject<MenuBag> }) => this.compareTag(data.tag)),
        takeUntil(this.destroy$),
      )
      .subscribe((data: { tag: string; listener: BehaviorSubject<MenuBag> }) => {
        data.listener.next({tag: this.tag, item: this.getSelectedItem(this.items)});
      });

    this.menuInternalService
      .onCollapseAll()
      .pipe(
        filter((data: { tag: string }) => this.compareTag(data.tag)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.collapseAll());

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse);
      });



    this.userStore.onUserStateChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: IUser) => {
        this.user = user;
      });

  }

  public user: IUser;

  ngAfterViewInit() {
    setTimeout(() => this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse));
  }

  onAddItem(data: { tag: string; items: MenuItem[] }) {
    this.items.push(...data.items);

    this.menuInternalService.prepareItems(this.items);
    this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse);
  }

  onHoverItem(item: MenuItem) {
    this.menuInternalService.itemHover(item, this.tag);
  }

  onToggleSubMenu(item: MenuItem) {
    if (this.autoCollapse) {
      this.menuInternalService.collapseAll(this.items, this.tag, item);
    }
    item.expanded = !item.expanded;
    this.menuInternalService.submenuToggle(item, this.tag);
  }

  // TODO: is not fired on page reload
  onSelectItem(item: MenuItem) {
    this.menuInternalService.selectItem(item, this.items, this.autoCollapse, this.tag);
  }

  onItemClick(item: MenuItem) {
    this.menuInternalService.itemClick(item, this.tag);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected navigateHome() {
    const homeItem = this.getHomeItem(this.items);

    if (homeItem) {
      if (homeItem.link) {
        const extras: NavigationExtras = {
          queryParams: homeItem.queryParams,
          queryParamsHandling: homeItem.queryParamsHandling,
          fragment: homeItem.fragment,
          preserveFragment: homeItem.preserveFragment,
        };
        this.router.navigate([homeItem.link], extras);
      }

      if (homeItem.url && isPlatformBrowser(this.platformId)) {
        this.window.location.href = homeItem.url;
      }
    }
  }

  protected collapseAll() {
    this.menuInternalService.collapseAll(this.items, this.tag);
  }

  protected getHomeItem(items: MenuItem[]): MenuItem {
    for (const item of items) {
      if (item.home) {
        return item;
      }

      const homeItem = item.children && this.getHomeItem(item.children);
      if (homeItem) {
        return homeItem;
      }
    }
  }

  protected compareTag(tag: string) {
    return !tag || tag === this.tag;
  }

  protected getSelectedItem(items: MenuItem[]): MenuItem {
    let selected = null;
    items.forEach((item: MenuItem) => {
      if (item.selected) {
        selected = item;
      }
      if (item.selected && item.children && item.children.length > 0) {
        selected = this.getSelectedItem(item.children);
      }
    });
    return selected;
  }
}


// ngOnInit(): void {
//   this.userStore.onUserStateChange()
//     .pipe(takeUntil(this.destroy$))
//     .subscribe((user: IUser) => {
//       this.user = user;
//     });
// }
//
// ngOnDestroy() {
//   this.destroy$.next();
//   this.destroy$.complete();
// }
//
// public user: IUser;

