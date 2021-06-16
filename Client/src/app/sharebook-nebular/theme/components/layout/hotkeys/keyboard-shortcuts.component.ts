import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {Subscription} from 'rxjs';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

// I kept the access modifiers here because of the nostalgia 🌧
@Component({
  selector: 'app-keyboard-shortcuts',
  templateUrl: './keyboard-shortcuts.component.html',
  styleUrls: ['./keyboard-shortcuts.component.scss']
})
export class KeyboardShortcutsComponent implements OnInit, OnDestroy {
  @Input() title = `Keyboard shortcuts:`;
  helpVisible = false;
  subscription: Subscription;

  hotkeys: Hotkey[];

  constructor(private hotkeysService: HotkeysService) {
  }

  public navigationalHotkeys: Hotkey[];
  public actionsHotkeys: Hotkey[];

  public ngOnInit(): void {
    this.subscription = this.hotkeysService.cheatSheetToggle.subscribe((isOpen) => {
      if (isOpen !== false) {
        this.hotkeys = this.hotkeysService.hotkeys.filter(hotkey => hotkey.description);
      }

      // TODO: remove magic number 💫
      this.navigationalHotkeys = this.hotkeys.filter((u, i) => i < 17);
      this.actionsHotkeys = this.hotkeys.filter((u, i) => i >= 17);

      if (isOpen === false) {
        this.helpVisible = false;
      } else {
        this.toggleHelpVisible();
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // omg :D
  svgStyles = {
    'display': 'inline-block',
    'fill': 'currentcolor',
    'flex-shrink': '0',
    'width': '1.5em',
    'height': '1.5em',
    'max-width': '100% ',
    'position': 'relative',
    'vertical-align': 'text-bottom',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
  };

  faTimes = faTimes;

  public toggleCheatSheet(): void {
    this.hotkeysService.cheatSheetToggle.next(!this.helpVisible);
  }

  public toggleHelpVisible(): void {
    this.helpVisible = !this.helpVisible;
  }

}
