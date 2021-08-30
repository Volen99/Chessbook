namespace Chessbook.Core.Domain.Notifications
{
    public enum UserNotificationType
    {
        NEW_VIDEO_FROM_SUBSCRIPTION = 1,
        NEW_COMMENT_ON_MY_VIDEO = 2,
        NEW_ABUSE_FOR_MODERATORS = 3,

        BLACKLIST_ON_MY_VIDEO = 4,
        UNBLACKLIST_ON_MY_VIDEO = 5,

        MY_VIDEO_PUBLISHED = 6,

        MY_VIDEO_IMPORT_SUCCESS = 7,
        MY_VIDEO_IMPORT_ERROR = 8,

        NEW_USER_REGISTRATION = 9,
        NEW_FOLLOW = 10,
        COMMENT_MENTION = 11,

        VIDEO_AUTO_BLACKLIST_FOR_MODERATORS = 12,

        NEW_INSTANCE_FOLLOWER = 13,

        AUTO_INSTANCE_FOLLOWING = 14,

        ABUSE_STATE_CHANGE = 15,

        ABUSE_NEW_MESSAGE = 16,

        NEW_LIKE_ON_MY_POST = 17,
    }
}
