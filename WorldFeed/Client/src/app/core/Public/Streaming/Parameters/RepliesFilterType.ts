
    // Filter the type of replies received in the stream.
    // https://dev.twitter.com/streaming/overview/request-parameters#replies
    export enum RepliesFilterType
    {
        // DEFAULT : You follow User B but not C. If B replies to C you WILL receive the reply in the stream.
        AllReplies,

        // You follow User B but not C. If B replies to C you WON'T receive the reply in the stream.
        // (Twitter default behavior)
        RepliesToKnownUsers,
    }
