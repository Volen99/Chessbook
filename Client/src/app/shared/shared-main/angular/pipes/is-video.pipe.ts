import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'isVideo'
})
export class IsVideoPipe implements PipeTransform {
  public static _youtubeRegEx = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
  public static _twitchRegEx = /(twitch\.tv\/)(videos\/|\?[^\?"'>]+video\=v)([^\?&"'>]+)/;
  public static _twitchClipRegEx = /(twitch\.tv\/)([^\?&"'>]+)/;

  public static isYoutube(url: string) {
    return this._youtubeRegEx.test(url);
  }

  public static isTwitch(url: string) {
    return this._twitchRegEx.test(url);
  }

  public static isTwitchClip(url: string) {
    return this._twitchClipRegEx.test(url);
  }

  public static getYoutubeEmbedLink(url: string): string {
    const parts = this._youtubeRegEx.exec(url);
    debugger
    return `https://www.youtube.com/embed/${parts[5]?.split(' ')[0]}`;
  }

  public static getTwitchEmbedLink(url: string): string {
    const parts = this._twitchRegEx.exec(url);
    debugger
    return `https://player.twitch.tv/?autoplay=false&parent=localhost&video=v${parts[3]?.split(' ')[0]}`;
  }

  public static getTwitchClipEmbedLink(url: string): string {
    const parts = this._twitchClipRegEx.exec(url);
    return `https://clips.twitch.tv/embed?clip=${parts[2]?.split('clip/')[1].split(' ')[0]}&parent=localhost`;
  }

  public transform(url: string): any {
    return IsVideoPipe.isYoutube(url) || IsVideoPipe.isTwitch(url) || IsVideoPipe.isTwitchClip(url);
  }

}
