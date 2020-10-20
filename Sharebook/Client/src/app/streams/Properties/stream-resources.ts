
    export class StreamResources
    {
        //   Looks up a localized string similar to https://stream.twitter.com/1.1/statuses/filter.json?.
        public static Stream_Filter: string = "https://stream.twitter.com/1.1/statuses/filter.json?";

        //   Looks up a localized string similar to You cannot run the multiple streams at the same times.
        public static Stream_IllegalMultipleStreams: string = "You cannot start a stream while it is already running.";

        //   Looks up a localized string similar to You must specify what to do when the stream retrieves an object.
        public static Stream_ObjectDelegateIsNull: string = "You must specify what to do when the stream retrieves an object";

        //   Looks up a localized string similar to https://stream.twitter.com/1.1/statuses/sample.json?.
        public static Stream_Sample: string = "https://stream.twitter.com/1.1/statuses/sample.json?";

        //   Looks up a localized string similar to You cannot change the tracks while having the stream running or on pause. The stream must be stopped before updating the tracks..
        public static TrackedStream_ModifyTracks_NotStoppedException_Description: string = "You cannot change the tracks while having the stream running or on pause. The stream must be stopped before updating the tracks.";

        public static GetResourceByName: string(resourceName: string)
        {
            return ResourcesHelper.GetResourceByType(typeof(Resources), );
        }
    }
}
