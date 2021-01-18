import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { HooksService } from '../../core/plugins/hooks.service';

const icons = {
  // misc icons
  npm: require('!!raw-loader?!../../../assets/images/misc/npm.svg').default,
  markdown: require('!!raw-loader?!../../../assets/images/misc/markdown.svg').default,
  language: require('!!raw-loader?!../../../assets/images/misc/language.svg').default,
  'video-lang': require('!!raw-loader?!../../../assets/images/misc/video-lang.svg').default,
  support: require('!!raw-loader?!../../../assets/images/misc/support.svg').default,
  'peertube-x': require('!!raw-loader?!../../../assets/images/misc/peertube-x.svg').default,
  robot: require('!!raw-loader?!../../../assets/images/misc/miscellaneous-services.svg').default, // material ui
  videos: require('!!raw-loader?!../../../assets/images/misc/video-library.svg').default, // material ui
  history: require('!!raw-loader?!../../../assets/images/misc/history.svg').default, // material ui
  subscriptions: require('!!raw-loader?!../../../assets/images/misc/subscriptions.svg').default, // material ui
  'playlist-add': require('!!raw-loader?!../../../assets/images/misc/playlist-add.svg').default, // material ui
  follower: require('!!raw-loader?!../../../assets/images/misc/account-arrow-left.svg').default, // material ui
  following: require('!!raw-loader?!../../../assets/images/misc/account-arrow-right.svg').default, // material ui

  // custom icons
  addPhoto: require('!!raw-loader?!../../../assets/images/feather/addPhoto.svg').default,
  addPoll: require('!!raw-loader?!../../../assets/images/feather/addPoll.svg').default,
  addEmoji: require('!!raw-loader?!../../../assets/images/feather/addEmoji.svg').default,
  angleArrowPointingToRight: require('!!raw-loader?!../../../assets/images/feather/angleArrowPointingToRight.svg').default,
  backArrow: require('!!raw-loader?!../../../assets/images/feather/backArrow.svg').default,
  cog: require('!!raw-loader?!../../../assets/images/feather/cog.svg').default,
  check: require('!!raw-loader?!../../../assets/images/feather/check.svg').default,
  calendar: require('!!raw-loader?!../../../assets/images/feather/calendar.svg').default,
  comment: require('!!raw-loader?!../../../assets/images/feather/comment.svg').default,
  colorPickerBlue: require('!!raw-loader?!../../../assets/images/feather/colorPickerBlue.svg').default,
  colorPickerYellow: require('!!raw-loader?!../../../assets/images/feather/colorPickerYellow.svg').default,
  colorPickerPink: require('!!raw-loader?!../../../assets/images/feather/colorPickerPink.svg').default,
  colorPickerPurple: require('!!raw-loader?!../../../assets/images/feather/colorPickerPurple.svg').default,
  colorPickerOrange: require('!!raw-loader?!../../../assets/images/feather/colorPickerOrange.svg').default,
  colorPickerGreen: require('!!raw-loader?!../../../assets/images/feather/colorPickerGreen.svg').default,
  explore: require('!!raw-loader?!../../../assets/images/feather/explore.svg').default,
  earthSouthAmerica: require('!!raw-loader?!../../../assets/images/feather/earthSouthAmerica.svg').default,
  flag: require('!!raw-loader?!../../../assets/images/feather/flag.svg').default,
  home: require('!!raw-loader?!../../../assets/images/feather/home.svg').default,
  info: require('!!raw-loader?!../../../assets/images/feather/info.svg').default,
  logo: require('!!raw-loader?!../../../assets/images/feather/logo.svg').default,
  notifications: require('!!raw-loader?!../../../assets/images/feather/notifications.svg').default,
  more: require('!!raw-loader?!../../../assets/images/feather/more.svg').default,
  messages: require('!!raw-loader?!../../../assets/images/feather/messages.svg').default,
  profile: require('!!raw-loader?!../../../assets/images/feather/profile.svg').default,
  protected: require('!!raw-loader?!../../../assets/images/feather/protected.svg').default,
  retweet: require('!!raw-loader?!../../../assets/images/feather/retweet.svg').default,
  share: require('!!raw-loader?!../../../assets/images/feather/share.svg').default,
  search: require('!!raw-loader?!../../../assets/images/feather/search.svg').default,
  upload: require('!!raw-loader?!../../../assets/images/feather/upload.svg').default,
  uploadGif: require('!!raw-loader?!../../../assets/images/feather/uploadGif.svg').default,
  verifiedAccount: require('!!raw-loader?!../../../assets/images/feather/verifiedAccount.svg').default,
  x: require('!!raw-loader?!../../../assets/images/feather/x.svg').default,
  '3dots': require('!!raw-loader?!../../../assets/images/feather/3dots.svg').default,

  playlists: require('!!raw-loader?!../../../assets/images/feather/list.svg').default,
  syndication: require('!!raw-loader?!../../../assets/images/feather/syndication.svg').default,
  help: require('!!raw-loader?!../../../assets/images/feather/help.svg').default,
  alert: require('!!raw-loader?!../../../assets/images/feather/alert.svg').default,
  globe: require('!!raw-loader?!../../../assets/images/feather/globe.svg').default,
  'recently-added': require('!!raw-loader?!../../../assets/images/feather/recently-added.svg').default,
  trending: require('!!raw-loader?!../../../assets/images/feather/trending.svg').default,
  dislike: require('!!raw-loader?!../../../assets/images/feather/dislike.svg').default,
  like: require('!!raw-loader?!../../../assets/images/feather/like.svg').default,
  no: require('!!raw-loader?!../../../assets/images/feather/no.svg').default,
  'cloud-download': require('!!raw-loader?!../../../assets/images/feather/cloud-download.svg').default,
  clock: require('!!raw-loader?!../../../assets/images/feather/clock.svg').default,
  delete: require('!!raw-loader?!../../../assets/images/feather/delete.svg').default,
  bell: require('!!raw-loader?!../../../assets/images/feather/bell.svg').default,
  'sign-out': require('!!raw-loader?!../../../assets/images/feather/log-out.svg').default,
  'sign-in': require('!!raw-loader?!../../../assets/images/feather/log-in.svg').default,
  download: require('!!raw-loader?!../../../assets/images/feather/download.svg').default,
  'ownership-change': require('!!raw-loader?!../../../assets/images/feather/share.svg').default,
  channel: require('!!raw-loader?!../../../assets/images/feather/tv.svg').default,
  user: require('!!raw-loader?!../../../assets/images/feather/user.svg').default,
  'user-x': require('!!raw-loader?!../../../assets/images/feather/user-x.svg').default,
  users: require('!!raw-loader?!../../../assets/images/feather/users.svg').default,
  'user-add': require('!!raw-loader?!../../../assets/images/feather/user-plus.svg').default,
  add: require('!!raw-loader?!../../../assets/images/feather/plus-circle.svg').default,
  'cloud-error': require('!!raw-loader?!../../../assets/images/feather/cloud-off.svg').default,
  undo: require('!!raw-loader?!../../../assets/images/feather/corner-up-left.svg').default,
  'circle-tick': require('!!raw-loader?!../../../assets/images/feather/check-circle.svg').default,
  'more-horizontal': require('!!raw-loader?!../../../assets/images/feather/more-horizontal.svg').default,
  'more-vertical': require('!!raw-loader?!../../../assets/images/feather/more-vertical.svg').default,
  play: require('!!raw-loader?!../../../assets/images/feather/play.svg').default,
  p2p: require('!!raw-loader?!../../../assets/images/feather/airplay.svg').default,
  fullscreen: require('!!raw-loader?!../../../assets/images/feather/maximize.svg').default,
  'exit-fullscreen': require('!!raw-loader?!../../../assets/images/feather/minimize.svg').default,
  film: require('!!raw-loader?!../../../assets/images/feather/film.svg').default,
  edit: require('!!raw-loader?!../../../assets/images/feather/edit-2.svg').default,
  sensitive: require('!!raw-loader?!../../../assets/images/feather/eye.svg').default,
  unsensitive: require('!!raw-loader?!../../../assets/images/feather/eye-off.svg').default,
  refresh: require('!!raw-loader?!../../../assets/images/feather/refresh-cw.svg').default,
  command: require('!!raw-loader?!../../../assets/images/feather/command.svg').default,
  go: require('!!raw-loader?!../../../assets/images/feather/arrow-up-right.svg').default,
  cross: require('!!raw-loader?!../../../assets/images/feather/x.svg').default,
  tick: require('!!raw-loader?!../../../assets/images/feather/check.svg').default,
  columns: require('!!raw-loader?!../../../assets/images/feather/columns.svg').default,
  live: require('!!raw-loader?!../../../assets/images/feather/live.svg').default,
  repeat: require('!!raw-loader?!../../../assets/images/feather/repeat.svg').default,
  'message-circle': require('!!raw-loader?!../../../assets/images/feather/message-circle.svg').default,
  codesandbox: require('!!raw-loader?!../../../assets/images/feather/codesandbox.svg').default
};

export type GlobalIconName = keyof typeof icons;

@Component({
  selector: 'app-global-icon',
  template: '',
  styleUrls: [ './global-icon.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalIconComponent implements OnInit {
  @Input() iconName: GlobalIconName;

  constructor(private el: ElementRef, private hooks: HooksService) {
  }

  async ngOnInit() {
    const nativeElement = this.el.nativeElement as HTMLElement;
    nativeElement.innerHTML = await this.hooks.wrapFun(
      this.getSVGContent.bind(this),
      { name: this.iconName },
      'common',
      'filter:internal.common.svg-icons.get-content.params',
      'filter:internal.common.svg-icons.get-content.result'
    );
  }

  private getSVGContent(options: { name: string }) {
    return icons[options.name];
  }
}
