import { VideoConstant, VideoPlaylistPrivacy } from '../../shared/models';;
import { FormReactive } from '../../shared/shared-forms/form-reactive';
import { SelectChannelItem } from '../../shared/shared-forms/select/select-channel.component';
import { VideoPlaylist } from '../../shared/shared-video-playlist';

export abstract class MyVideoPlaylistEdit extends FormReactive {
  // Declare it here to avoid errors in create template
  videoPlaylistToUpdate: VideoPlaylist;
  userVideoChannels: SelectChannelItem[] = [];
  videoPlaylistPrivacies: VideoConstant<VideoPlaylistPrivacy>[] = [];

  abstract isCreation(): boolean

  abstract getFormButtonTitle(): string
}
