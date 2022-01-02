export const enum UserNotificationSettingValue {
  NONE = 0,
  WEB = 1 << 0,
  EMAIL = 1 << 1,
  BOTH = 1 << 2,
}

export interface UserNotificationSetting {
  abuseAsModerator: UserNotificationSettingValue;

  newVideoFromSubscription: UserNotificationSettingValue;

  // blacklistOnMyVideo: UserNotificationSettingValue;

  commentMention: UserNotificationSettingValue;
  newCommentOnMyVideo: UserNotificationSettingValue;

  newFollow: UserNotificationSettingValue;

  // abuseStateChange: UserNotificationSettingValue;
  // abuseNewMessage: UserNotificationSettingValue;
}
