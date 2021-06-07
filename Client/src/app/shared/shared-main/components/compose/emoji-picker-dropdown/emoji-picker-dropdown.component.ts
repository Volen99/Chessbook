import {
  AfterViewInit,
  Component, ComponentFactoryResolver, ComponentRef,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild, ViewContainerRef
} from '@angular/core';
import { supportsPassiveEvents } from 'detect-passive-events';
import { buildCustomEmojis, categoriesFromEmojis } from '../../emoji/emoji';


import { EmojiPicker as EmojiPickerAsync } from 'app/ui/util/async-components';

const messages = ({
  emoji: { id: 'emoji_button.label', defaultMessage: 'Insert emoji' },
  emoji_search: { id: 'emoji_button.search', defaultMessage: 'Search...' },
  emoji_not_found: { id: 'emoji_button.not_found', defaultMessage: 'No emojos!! (╯°□°）╯︵ ┻━┻' },
  custom: { id: 'emoji_button.custom', defaultMessage: 'Custom' },
  recent: { id: 'emoji_button.recent', defaultMessage: 'Frequently used' },
  search_results: { id: 'emoji_button.search_results', defaultMessage: 'Search results' },
  people: { id: 'emoji_button.people', defaultMessage: 'People' },
  nature: { id: 'emoji_button.nature', defaultMessage: 'Nature' },
  food: { id: 'emoji_button.food', defaultMessage: 'Food & Drink' },
  activity: { id: 'emoji_button.activity', defaultMessage: 'Activity' },
  travel: { id: 'emoji_button.travel', defaultMessage: 'Travel & Places' },
  objects: { id: 'emoji_button.objects', defaultMessage: 'Objects' },
  symbols: { id: 'emoji_button.symbols', defaultMessage: 'Symbols' },
  flags: { id: 'emoji_button.flags', defaultMessage: 'Flags' },
});

const backgroundImageFn = () => `/assets/images/emoji_sheet_10.png`;      // ${assetHost}
let EmojiPicker, Emoji; // load asynchronously

const listenerOptions = supportsPassiveEvents ? { passive: true } : false;

@Component({
  selector: 'app-modifier-picker-menu',
  templateUrl: './modifier-picker-menu.component.html',
  styleUrls: ['./modifier-picker-menu.component.scss']
})
export class ModifierPickerMenuComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('divRef') divRef: ElementRef<HTMLDivElement>;

  @Input() active: boolean;
  @Input() onSelect: (el: any) => any;
  @Input() onClose: () => any;

  constructor() { }

  ngOnInit(): void {
    this.EmojiPicker = EmojiPicker;
    this.Emoji = Emoji;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let {active} = changes;
    if (active) {
      this.attachListeners();
    } else {
      this.removeListeners();
    }
  }

  ngAfterViewInit(): void {
    this.node = this.divRef.nativeElement;
  }


  ngOnDestroy(): void {
    this.removeListeners();
  }

  backgroundImageFn = backgroundImageFn;

  handleClick = e => {
    this.onSelect(e.currentTarget.getAttribute('data-index') * 1);
  }

  handleDocumentClick = e => {
    if (this.node && !this.node.contains(e.target)) {
      this.onClose();
    }
  }

  EmojiPicker: ComponentRef<any>;
  Emoji: ComponentRef<any>;

  node = null;

  attachListeners () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  removeListeners () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    // @ts-ignore
    document.removeEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }
}


@Component({
  selector: 'app-modifier-picker',
  templateUrl: './modifier-picker.component.html',
  styleUrls: ['./modifier-picker.component.scss']
})
export class ModifierPickerComponent implements OnInit {
  @Input() active: boolean;
  @Input() modifier: number;
  @Input() onChange: (modifier: number) => any;
  @Input() onClose: () => any;
  @Input() onOpen: () => any;

  backgroundImageFn = backgroundImageFn;

  constructor() {

  }

  ngOnInit(): void {
  }

  handleClick = () => {
    if (this.active) {
      this.onClose();
    } else {
      this.onOpen();
    }
  }

  handleSelect = modifier => {
    this.onChange(modifier);
    this.onClose();
  }

}

@Component({
  selector: 'app-emoji-picker-menu',
  templateUrl: './emoji-picker-menu.component.html',
  styleUrls: ['./emoji-picker-menu.component.scss']
})
export class EmojiPickerMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('divRef') divRef: ElementRef<HTMLDivElement>;

  @Input() custom_emojis: Map<any, any>;
  @Input() frequentlyUsedEmojis: Array<string> = [];
  @Input() loading: boolean = true;
  @Input() onClose: () => any;
  @Input() onPick: (emoji: any) => any;
  @Input() style: object = {};
  @Input() placement: string;
  @Input() arrowOffsetLeft: string;
  @Input() arrowOffsetTop: string;
  @Input() skinTone: () => any;
  @Input() onSkinTone: (modifier: any) => any;

  constructor() { }

  ngOnInit(): void {
    this.categoriesSort = [
      'recent',
      'people',
      'nature',
      'foods',
      'activity',
      'places',
      'objects',
      'symbols',
      'flags',
    ];

    this.categoriesSort.splice(1, 0, ...Array.from(categoriesFromEmojis(this.custom_emojis)).sort());
  }

  ngAfterViewInit(): void {
    this.node = this.divRef.nativeElement;

    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleDocumentClick, false);
    // @ts-ignore
    document.removeEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  buildCustomEmojis = buildCustomEmojis;
  backgroundImageFn = backgroundImageFn;

  modifierOpen: boolean = false;
  placementState: string = null;

  title = messages.emoji;
  categoriesSort: any;

  node = null;

  handleDocumentClick = e => {
    if (this.node && !this.node.contains(e.target)) {
      this.onClose();
    }
  }

  handleClick = (emoji, event) => {
    if (!emoji.native) {
      emoji.native = emoji.colons;
    }
    if (!(event.ctrlKey || event.metaKey)) {
      this.onClose();
    }
    this.onPick(emoji);
  }

  handleModifierOpen = () => {
    this.modifierOpen = true;
  }

  handleModifierClose = () => {
    this.modifierOpen = false;
  }

  handleModifierChange = modifier => {
    this.onSkinTone(modifier);
  }

}



@Component({
  selector: 'app-emoji-picker-dropdown',
  templateUrl: './emoji-picker-dropdown.component.html',
  styleUrls: ['./emoji-picker-dropdown.component.scss']
})
export class EmojiPickerDropdownComponent implements OnInit, AfterViewInit {
  @ViewChild('divRef') divRef: ElementRef<HTMLDivElement>;

  @Input() custom_emojis: Map<any, any>;
  @Input() frequentlyUsedEmojis: Array<string>;
  @Input() onPickEmoji: () => any;
  @Input() onSkinTone: () => any;
  @Input() skinTone: () => any;
  @Input() button: HTMLElement;

  // https://www.telerik.com/blogs/how-to-lazy-load-component-angular ♥
  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.target = this.divRef;
  }

  active = false;
  loading = false;
  placement: string;

  title = messages.emoji;

  target = null;

  EmojiPicker: ComponentRef<any>;
  Emoji: ComponentRef<any>;

  onShowDropdown = ({ target }) => {
    this.active = true;

    if (!EmojiPicker) {
      this.loading = true;

      EmojiPickerAsync().then(EmojiMart => {
        EmojiPicker = EmojiMart.Picker;
        Emoji       = EmojiMart.Emoji;

        this.loading = false;
      }).catch(() => {
        this.loading = false;
        this.active = false;
      });
    }

    const { top } = target.getBoundingClientRect();
    this.placement = top * 2 < innerHeight ? 'bottom' : 'top';
  }

  onHideDropdown = () => {
    this.active = false;
  }

  onToggle = (e) => {
    debugger
    if (!this.loading && (!e.key || e.key === 'Enter')) {
      if (this.active) {
        this.onHideDropdown();
      } else {
        this.onShowDropdown(e);
      }
    }
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.onHideDropdown();
    }
  }

  findTarget = () => {
    return this.target;
  }



}

























