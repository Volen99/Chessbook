namespace Chessbook.Core.Domain.Cards
{
    public enum PreviewCardType
    {
        Link = 1,       // Link OEmbed
        Photo = 2,      // Photo OEmbed
        Video = 3,      // Video OEmbed
        Rich = 4,       // iframe OEmbed. Not currently accepted, so won't show up in practice.
    }
}
