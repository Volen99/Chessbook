import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard-shortcuts',
  templateUrl: './keyboard-shortcuts.component.html',
  styleUrls: [ './keyboard-shortcuts.component.scss' ]
})
export class KeyboardShortcutsComponent implements OnInit, OnDestroy {
  @Input() title = $localize`Keyboard shortcuts:`;
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

        // TODO: remove magic number 💫
        this.navigationalHotkeys = this.hotkeys.filter((u, i) => i < 19);
        this.actionsHotkeys = this.hotkeys.filter((u, i) => i >= 19);
      }

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

  public toggleCheatSheet(): void {
    this.hotkeysService.cheatSheetToggle.next(!this.helpVisible);
  }

  public toggleHelpVisible(): void {
    this.helpVisible = !this.helpVisible;
  }

  public isCloseIconHovered = false;

  handleCloseIconHover(event: MouseEvent) {
    this.isCloseIconHovered = !this.isCloseIconHovered;
  }
}
