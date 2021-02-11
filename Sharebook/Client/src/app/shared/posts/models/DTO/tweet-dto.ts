import {ITweetIdentifier} from "../tweet-identifier";
import {ICoordinates} from "../properties/ICoordinates";
import {IUser} from "../../../../core/interfaces/common/users";
import {ITweetEntities} from "../../../post-object/Entities/interfaces/ITweetEntities";
import {IPlace} from "../properties/IPlace";

export interface ITweetDTO extends ITweetIdentifier {
    text: string;

    fullText: string;

    displayTextRange: number[];

    // extendedTweet: IExtendedTweet;

    favorited: boolean;

    favoriteCount?: number;

    createdBy: IUser;

    currentUserRetweetIdentifier: ITweetIdentifier;

    coordinates: ICoordinates;

    entities: ITweetEntities;

    // legacyEntities: ITweetEntities;

    createdAt: Date; // DateTimeOffset;

    truncated: boolean;

    // This property is only available with the Premium and Enterprise tier products.
    replyCount?: number;

    inReplyToStatusId?: number;

    inReplyToStatusIdStr: string;

    inReplyToUserId?: number;

    inReplyToUserIdStr: string;

    inReplyToScreenName: string;

    retweetCount: number;

    retweeted: boolean;

    retweetedTweetDTO: ITweetDTO;

    // This property is only available with the Premium and Enterprise tier products.
    quoteCount?: number;

    quotedStatusId?: number;

    quotedStatusIdStr: string;

    quotedTweetDTO: ITweetDTO;

    // language?: Language;

    possiblySensitive: boolean;

    contributorsIds: number[];

    contributors: Array<number>;

    source: string;

    scopes: Map<string, object>;

    filterLevel: string;

    withheldCopyright: boolean;

    withheldInCountries: Array<string>;

    withheldScope: string;

    place: IPlace;
}