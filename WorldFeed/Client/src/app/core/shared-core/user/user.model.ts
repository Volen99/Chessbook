import {Url} from '../Feed/Entities/url.model';

export interface User {
  id: string;
  name: string; // The name of the user, as they’ve defined it. Not necessarily a person’s name. Typically capped at 50 characters
  screenName: string; // The screen name, handle, or alias that this user identifies themselves with. Unique but subject to change
  location?: string; // The user-defined location for this account’s profile. Not necessarily a location, nor machine-parseable
  derived: {        // Provides the Profile Geo Enrichment metadata
    locations: [
      {
        country: string,
        countryCode: string,
        locality: string,
      }
    ]
  };
  url?: string; // A URL provided by the user in association with their profile: "https://developer.twitter.com"
  entities: {
    url: {
      urls: Array<Url>,
    }
    description: {
      urls: Array<Url>,
    }
  };
  description?: string; // The user-defined UTF-8 string describing their account.
  protected: boolean; // When true, indicates that this user has chosen to protect their Tweets
  verified: boolean; // When true, indicates that the user has a verified account;
  followersCount: number; // The number of followers this account currently has
  friendsCount: number; // The number of users this account is following (AKA their “followings”).
  listedCount: number; // The number of public lists that this user is a member of
  favouritesCount: number; // The number of Tweets this user has liked in the account’s lifetime
  statusesCount: number; // The number of Tweets (including retweets) issued by the user
  createdAt: string;  // The UTC datetime that the user account was created on Twitter: "Mon Nov 29 21:18:15 +0000 2010"
  profile_banner_url: string; // The HTTPS-based URL pointing to the standard web representation of the user’s uploaded profile banner
  profile_image_url_https: string; // A HTTPS-based URL pointing to the user’s profile image
  default_profile: boolean; // When true, indicates that the user has not altered the theme or background of their user profile
  default_profile_image: boolean; // When true, indicates that the user has not uploaded their own profile image and a default image is used
  withheldInCountries: Array<string>; // When present, indicates a list of uppercase two-letter country codes this content is withheld from
  withheld_scope: string; // When present, indicates that the content being withheld is a “user.”

  // firstName: string;
  // lastName: string;
  // gender: Gender;
  // age: number;
  // createdOn: Date;
  // location: string;
  // description: string;
  // url: string;
  // entities: Entities;
  // protected: boolean;
  // followersCount: number;
  // friendsCount: number;
  // listedCount: number;
  // favouritesCount: number;
  // utcOffset: string;
  // timeZone: Date;
  // geoEnabled: boolean;
  // verified: boolean;
  // statusesCount: number;
  // sang: string;
  // contributorsEnabled: boolean;
  // isTranslator: boolean;
  // isTranslationEnabled: boolean;
  // profileBackgroundColor: string;
  // profileBackgroundImageUrl: string;
  // profileBackgroundImageUrlHttps: string;
  // profileBackgroundTile: boolean;
  // profileImageUrl: string;
  // profileImageUrlHttps: string;
  // profileBannerUrl: string;
  // profileLinkColor: string;
  // profileSidebarBorderColor: string;
  // profileSidebarFillColor: string;
  // profileTextColor: string;
  // profileUseBackgroundImage: boolean;
  // defaultProfile: boolean;
  // defaultProfileImage: boolean;
  // following: boolean;
  // followRequestSent: string;
  // notifications: string;
  // blocking: boolean;
  // translatorType: string;
  // followedBy: boolean;
}
