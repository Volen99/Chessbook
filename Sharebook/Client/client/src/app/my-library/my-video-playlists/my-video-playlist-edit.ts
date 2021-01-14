import { VideoConstant, VideoPlaylistPrivacy } from '../../../../../shared/models';
import { VideoPlaylist } from '../../../../../shared/models/videos/playlist/video-playlist.model';
import { FormReactive } from '../../shared/shared-forms/form-reactive';
import { SelectChannelItem } from '../../shared/shared-forms/select/select-channel.component';

export abstract class MyVideoPlaylistEdit extends FormReactive {
  // Declare it here to avoid errors in create template
  videoPlaylistToUpdate: VideoPlaylist;
  userVideoChannels: SelectChannelItem[] = [];
  videoPlaylistPrivacies: VideoConstant<VideoPlaylistPrivacy>[] = [];

  abstract isCreation(): boolean

  abstract getFormButtonTitle(): string
}
