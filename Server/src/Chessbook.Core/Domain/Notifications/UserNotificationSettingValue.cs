namespace Chessbook.Core.Domain.Notifications
{
    public enum UserNotificationSettingValue
    {
        NONE = 0,
        WEB = 1 << 0,
        EMAIL = 1 << 1
    }
}
