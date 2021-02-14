import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Params, QueryParamsHandling} from '@angular/router';
import {Observable, BehaviorSubject, ReplaySubject, Subject, of} from 'rxjs';
import {share} from 'rxjs/operators';
import {isFragmentContain, isFragmentEqual, isUrlPathContain, isUrlPathEqual} from './url-matching-helpers';
import {GlobalIconComponent} from "../../../shared/shared-icons/global-icon.component";
import {NbMenuItem} from "@nebular/theme";
// import {NbIconConfig} from '../icon/icon.component';

export interface MenuBag {
  tag: string;
  item: MenuItem;
}

const itemClick$ = new Subject<MenuBag>();
const addItems$ = new ReplaySubject<{ tag: string; items: MenuItem[] }>(1);
const navigateHome$ = new ReplaySubject<{ tag: string }>(1);
const getSelectedItem$
  = new ReplaySubject<{ tag: string; listener: BehaviorSubject<MenuBag> }>(1);
const itemSelect$ = new ReplaySubject<MenuBag>(1);
const itemHover$ = new ReplaySubject<MenuBag>(1);
const submenuToggle$ = new ReplaySubject<MenuBag>(1);
const collapseAll$ = new ReplaySubject<{ tag: string }>(1);

// TODO: check if we need both URL and LINK
/**
 *
 *
 * Menu Item options example
 * @stacked-example(Menu Link Parameters, menu/menu-link-params.component)
 *
 *
 */
export class MenuItem {
  /**
   * Item Title
   * @type {string}
   */
  title: string;
  /**
   * Item relative link (for routerLink)
   * @type {string}
   */
  link?: string;
  /**
   * Item URL (absolute)
   * @type {string}
   */
  url?: string;
  /**
   * Icon class name or icon config object
   * @type {string | NbIconConfig}
   */
  icon?: string | GlobalIconComponent;
  /**
   * Expanded by default
   * @type {boolean}
   */
  expanded?: boolean;

  /**
   * Children items
   * @type {List<MenuItem>}
   */
  children?: MenuItem[];
  /**
   * HTML Link target
   * @type {string}
   */
  target?: string;
  /**
   * Hidden Item
   * @type {boolean}
   */
  hidden?: boolean;
  /**
   * Item is selected when partly or fully equal to the current url
   * @type {string}
   */
  pathMatch?: 'full' | 'prefix' = 'full';
  /**
   * Where this is a home item
   * @type {boolean}
   */
  home?: boolean;
  /** Whether the item is just a group (non-clickable)
   * @type {boolean}
   */
  group?: boolean;
  /**
   *  Whether the item skipLocationChange is true or false
   * @type {boolean}
   */
  skipLocationChange?: boolean;
  /** Map of query parameters
   * @type {Params}
   */
  queryParams?: Params;
  queryParamsHandling?: QueryParamsHandling;
  parent?: MenuItem;
  selected?: boolean;
  data?: any;
  fragment?: string;
  preserveFragment?: boolean;

  /**
   * @returns item parents in top-down order
   */
  static getParents(item: MenuItem): MenuItem[] {
    const parents = [];

    let parent = item.parent;
    while (parent) {
      parents.unshift(parent);
      parent = parent.parent;
    }

    return parents;
  }

  static isParent(item: MenuItem, possibleChild: MenuItem): boolean {
    return possibleChild.parent
      ? possibleChild.parent === item || this.isParent(item, possibleChild.parent)
      : false;
  }
}

// TODO: map select events to router change events
// TODO: review the interface
/**
 *
 *
 * Menu Service. Allows you to listen to menu events, or to interact with a menu.
 * @stacked-example(Menu Service, menu/menu-service.component)
 *
 *
 */
@Injectable()
export class MenuService {

  /**
   * Add items to the end of the menu items list
   * @param {List<MenuItem>} items
   * @param {string} tag
   */
  addItems(items: MenuItem[], tag?: string) {
    addItems$.next({tag, items});
  }

  /**
   * Collapses all menu items
   * @param {string} tag
   */
  collapseAll(tag?: string) {
    collapseAll$.next({tag});
  }

  /**
   * Navigate to the home menu item
   * @param {string} tag
   */
  navigateHome(tag?: string) {
    navigateHome$.next({tag});
  }

  /**
   * Returns currently selected item. Won't subscribe to the future events.
   * @param {string} tag
   * @returns {Observable<{tag: string; item: MenuItem}>}
   */
  getSelectedItem(tag?: string): Observable<MenuBag> {
    const listener = new BehaviorSubject<MenuBag>(null);

    getSelectedItem$.next({tag, listener});

    return listener.asObservable();
  }

  onItemClick(): Observable<MenuBag> {
    return itemClick$.pipe(share());
  }

  onItemSelect(): Observable<MenuBag> {
    return itemSelect$.pipe(share());
  }

  onItemHover(): Observable<MenuBag> {
    return itemHover$.pipe(share());
  }

  onSubmenuToggle(): Observable<MenuBag> {
    return submenuToggle$.pipe(share());
  }
}

@Injectable()
export class MenuInternalService {

  constructor(private location: Location) {
  }

  prepareItems(items: MenuItem[]) {
    const defaultItem = new MenuItem();
    items.forEach(i => {
      this.applyDefaults(i, defaultItem);
      this.setParent(i);
    });
  }

  selectFromUrl(items: MenuItem[], tag: string, collapseOther: boolean = false) {
    const selectedItem = this.findItemByUrl(items);
    if (selectedItem) {
      this.selectItem(selectedItem, items, collapseOther, tag);
    }
  }

  selectItem(item: MenuItem, items: MenuItem[], collapseOther: boolean = false, tag: string) {
    const unselectedItems = this.resetSelection(items);
    const collapsedItems = collapseOther ? this.collapseItems(items) : [];

    for (const parent of MenuItem.getParents(item)) {
      parent.selected = true;
      // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
      if (!unselectedItems.includes(parent)) {
        this.itemSelect(parent, tag);
      }

      const wasNotExpanded = !parent.expanded;
      parent.expanded = true;
      const i = collapsedItems.indexOf(parent);
      // emit event only for items that weren't expanded before.
      // 'collapsedItems' contains items that were expanded, so no need to emit event.
      // in case 'collapseOther' is false, 'collapsedItems' will be empty,
      // so also check if item isn't expanded already ('wasNotExpanded').
      if (i === -1 && wasNotExpanded) {
        this.submenuToggle(parent, tag);
      } else {
        collapsedItems.splice(i, 1);
      }
    }

    item.selected = true;
    // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
    if (!unselectedItems.includes(item)) {
      this.itemSelect(item, tag);
    }

    // remaining items which wasn't expanded back after expanding all currently selected items
    for (const collapsedItem of collapsedItems) {
      this.submenuToggle(collapsedItem, tag);
    }
  }

  collapseAll(items: MenuItem[], tag: string, except?: MenuItem) {
    const collapsedItems = this.collapseItems(items, except);

    for (const item of collapsedItems) {
      this.submenuToggle(item, tag);
    }
  }

  onAddItem(): Observable<{ tag: string; items: MenuItem[] }> {
    return addItems$.pipe(share());
  }

  onNavigateHome(): Observable<{ tag: string }> {
    return navigateHome$.pipe(share());
  }

  onCollapseAll(): Observable<{ tag: string }> {
    return collapseAll$.pipe(share());
  }

  onGetSelectedItem(): Observable<{ tag: string; listener: BehaviorSubject<MenuBag> }> {
    return getSelectedItem$.pipe(share());
  }

  itemHover(item: MenuItem, tag?: string) {
    itemHover$.next({tag, item});
  }

  submenuToggle(item: MenuItem, tag?: string) {
    submenuToggle$.next({tag, item});
  }

  itemSelect(item: MenuItem, tag?: string) {
    itemSelect$.next({tag, item});
  }

  itemClick(item: MenuItem, tag?: string) {
    itemClick$.next({tag, item});
  }

  /**
   * Unselect all given items deeply.
   * @param items array of items to unselect.
   * @returns items which selected value was changed.
   */
  private resetSelection(items: MenuItem[]): MenuItem[] {
    const unselectedItems = [];

    for (const item of items) {
      if (item.selected) {
        unselectedItems.push(item);
      }
      item.selected = false;

      if (item.children) {
        unselectedItems.push(...this.resetSelection(item.children));
      }
    }

    return unselectedItems;
  }

  /**
   * Collapse all given items deeply.
   * @param items array of items to collapse.
   * @param except menu item which shouldn't be collapsed, also disables collapsing for parents of this item.
   * @returns items which expanded value was changed.
   */
  private collapseItems(items: MenuItem[], except?: MenuItem): MenuItem[] {
    const collapsedItems = [];

    for (const item of items) {
      if (except && (item === except || MenuItem.isParent(item, except))) {
        continue;
      }

      if (item.expanded) {
        collapsedItems.push(item);
      }
      item.expanded = false;

      if (item.children) {
        collapsedItems.push(...this.collapseItems(item.children));
      }
    }

    return collapsedItems;
  }

  // tslint:disable
  private applyDefaults(item, defaultItem) {
    const menuItem = {...item};
    Object.assign(item, defaultItem, menuItem);
    item.children && item.children.forEach(child => {
      this.applyDefaults(child, defaultItem);
    });
  }

  private setParent(item: MenuItem) {
    item.children && item.children.forEach(child => {
      child.parent = item;
      this.setParent(child);
    });
  }

  /**
   * Find deepest item which link matches current URL path.
   * @param items array of items to search in.
   * @returns found item of undefined.
   */
  private findItemByUrl(items: MenuItem[]): MenuItem | undefined {
    let selectedItem;

    items.some(item => {
      if (item.children) {
        selectedItem = this.findItemByUrl(item.children);
      }
      if (!selectedItem && this.isSelectedInUrl(item)) {
        selectedItem = item;
      }

      return selectedItem;
    });

    return selectedItem;
  }

  private isSelectedInUrl(item: MenuItem): boolean {
    const exact: boolean = item.pathMatch === 'full';
    const link: string = item.link;

    const isSelectedInPath = exact
      ? isUrlPathEqual(this.location.path(), link)
      : isUrlPathContain(this.location.path(), link);

    if (isSelectedInPath && item.fragment != null) {
      return exact
        ? isFragmentEqual(this.location.path(true), item.fragment)
        : isFragmentContain(this.location.path(true), item.fragment);
    }

    return isSelectedInPath;
  }
}