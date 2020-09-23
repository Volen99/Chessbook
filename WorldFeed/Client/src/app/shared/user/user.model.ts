import {Url} from '../Feed/Entities/url.model';
import {Gender} from '../../core/authentication/enums/gender';

export interface User {
  id: string;
  idStr: string;
  name: string; // The name of the user, as they’ve defined it. Not necessarily a person’s name. Typically capped at 50 characters
  screenName: string; // The screen name, handle, or alias that this user identifies themselves with. Unique but subject to change
  email: string;
  location?: string; // The user-defined location for this account’s profile. Not necessarily a location, nor machine-parseable
  profileLocation: string;
  description?: string; // The user-defined UTF-8 string describing their account.
  url?: string; // A URL provided by the user in association with their profile: "https://developer.twitter.com"
  entities: {
    url: {
      urls: Array<Url>,
    }
    description: {
      urls: Array<Url>,
    }
  };
  protected: boolean; // When true, indicates that this user has chosen to protect their Tweets
  followersCount: number; // The number of followers this account currently has
  friendsCount: number; // The number of users this account is following (AKA their “followings”)
  listedCount: number; // The number of public lists that this user is a member of
  createdOn: string;  // The UTC datetime that the user account was created on Twitter: "Sun Jul 20  20:17:40 +0000 1969"
  favouritesCount: number; // The number of Tweets this user has liked in the account’s lifetime
  utcOffset: string;
  timeZone: Date;

  // withheldInCountries: Array<string>; // When present, indicates a list of uppercase two-letter country codes this content is withheld from
  // withheld_scope: string; // When present, indicates that the content being withheld is a “user.”

  geoEnabled: boolean;
  verified: boolean;                  // When true, indicates that the user has a verified account;
  statusesCount: number;              // The number of Tweets (including retweets) issued by the user
  mediaCount: number;
  Lang: string;
  contributorsEnabled: boolean;
  isTranslator: boolean;
  isTranslationEnabled: boolean;
  profileBackgroundColor: string;
  profileBackgroundImageUrl: string;
  profileBackgroundImageUrlHttps: string;
  profileBackgroundTile: boolean;
  profileImageUrl: string;
  profileImageUrlHttps: string;     // A HTTPS-based URL pointing to the user’s profile image
  profileBannerUrl: string;         // The HTTPS-based URL pointing to the standard web representation of the user’s uploaded profile banner
  profileLinkColor: string;
  profileSidebarBorderColor: string;
  profileSidebarFillColor: string;
  profileTextColor: string;
  profileUseBackgroundImage: boolean;
  defaultProfile: boolean;            // When true, indicates that the user has not altered the theme or background of their user profile
  defaultProfileImage: boolean;
  pinnedTweetIds: string;
  hasCustomTimelines: boolean;
  canMediaTag: boolean;
  followedBy: boolean;
  following: boolean;
  followRequestSent: string;
  notifications: string;
  blocking: boolean;
  businessProfileState: string;
  translatorType: string;
  requireSomeConsent: boolean;
  gender: Gender;

  // derived: {        // Provides the Profile Geo Enrichment metadata
  //   locations: [
  //     {
  //       country: string,
  //       countryCode: string,
  //       locality: string,
  //     }
  //   ]
  // };
}
