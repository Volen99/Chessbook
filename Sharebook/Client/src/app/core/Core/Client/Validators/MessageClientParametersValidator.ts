import {Inject, Injectable, InjectionToken} from "@angular/core";

import {TwitterLimits} from "../../../Public/Settings/TwitterLimits";
import ArgumentException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import {IPublishMessageParameters} from "../../../Public/Parameters/MessageClient/PublishMessageParameters";
import {IDeleteMessageParameters} from "../../../Public/Parameters/MessageClient/DestroyMessageParameters";
import {IGetMessageParameters} from "../../../Public/Parameters/MessageClient/GetMessageParameters";
import {IGetMessagesParameters} from "../../../Public/Parameters/MessageClient/GetMessagesParameters";
import {ITwitterClient, ITwitterClientToken} from "../../../Public/ITwitterClient";
import {
  IMessagesClientRequiredParametersValidator,
  IMessagesClientRequiredParametersValidatorToken, MessagesClientRequiredParametersValidator
} from "./MessageClientRequiredParametersValidator";
import {MessagesParameters} from "./parameters-types";
import {TwitterArgumentLimitException} from "../../../Public/Exceptions/TwitterArgumentLimitException";
import {QuickReplyOption} from "../../Models/Properties/QuickReplyOption";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface IMessagesClientParametersValidator {
  validate(parameters: IPublishMessageParameters): void;

  validate(parameters: IDeleteMessageParameters): void;

  validate(parameters: IGetMessageParameters): void;

  validate(parameters: IGetMessagesParameters): void;
}

export const IMessagesClientParametersValidatorToken = new InjectionToken<IMessagesClientParametersValidator>('IMessagesClientParametersValidator', {
  providedIn: 'root',
  factory: () => new MessagesClientParametersValidator(Inject(TwitterClient), Inject(MessagesClientRequiredParametersValidator)),
});

@Injectable()
export class MessagesClientParametersValidator implements IMessagesClientParametersValidator {
  private readonly _client: ITwitterClient;
  private readonly _messagesClientRequiredParametersValidator: IMessagesClientRequiredParametersValidator;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(IMessagesClientRequiredParametersValidatorToken) messagesClientRequiredParametersValidator: IMessagesClientRequiredParametersValidator) {
    this._client = client;
    this._messagesClientRequiredParametersValidator = messagesClientRequiredParametersValidator;
  }

  private get Limits(): TwitterLimits {
    return this._client.config.limits;
  }

  public validate(parameters: MessagesParameters): void {
    this._messagesClientRequiredParametersValidator.validate(parameters);

    if (MessagesClientParametersValidator.isIPublishMessageParameters(parameters)) {
      if (parameters.text.UTF32Length() > this.Limits.MESSAGE_MAX_SIZE) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.text)}`, this.Limits.MESSAGE_MAX_SIZE,
          nameof(this.Limits.MESSAGE_MAX_SIZE), "characters");
      }

      if (parameters.quickReplyOptions != null && parameters.quickReplyOptions.length > 0) {
        if (parameters.quickReplyOptions.length > this.Limits.MESSAGE_QUICK_REPLY_MAX_OPTIONS) {
          throw new TwitterArgumentLimitException(`${nameof(parameters.quickReplyOptions)}`,
            this.Limits.MESSAGE_QUICK_REPLY_MAX_OPTIONS, nameof(this.Limits.MESSAGE_QUICK_REPLY_MAX_OPTIONS), "options");
        }

        // If one option has a description, then they all must: https://developer.twitter.com/en/docs/direct-messages/quick-replies/api-reference/options
        let numberOfOptionsWithDescription = parameters.quickReplyOptions.count(x => !string.IsNullOrEmpty(x.Description));
        if (numberOfOptionsWithDescription > 0 && numberOfOptionsWithDescription !== parameters.quickReplyOptions.length) {
          throw new ArgumentException("If one Quick Reply Option has a description, then they all must", `${nameof(parameters.quickReplyOptions)}`);
        }

        if (numberOfOptionsWithDescription > 0 && parameters.quickReplyOptions.some(x => x.description.UTF32Length() > this.Limits.MESSAGE_QUICK_REPLY_DESCRIPTION_MAX_LENGTH)) {
          throw new TwitterArgumentLimitException(`${nameof(parameters.quickReplyOptions)}.${nameof(QuickReplyOption.prototype.description)}`,
            this.Limits.MESSAGE_QUICK_REPLY_DESCRIPTION_MAX_LENGTH, nameof(this.Limits.MESSAGE_QUICK_REPLY_DESCRIPTION_MAX_LENGTH), "characters per quick option description");
        }

        if (parameters.quickReplyOptions.some(x => !(x.label))) {
          throw new ArgumentException("Quick Reply Option Label is a required field",
            `${nameof(parameters)}${nameof(parameters.quickReplyOptions)}.${nameof(QuickReplyOption.prototype.label)}`);
        }

        if (parameters.quickReplyOptions.some(x => x.label.UTF32Length() > this.Limits.MESSAGE_QUICK_REPLY_LABEL_MAX_LENGTH)) {
          throw new TwitterArgumentLimitException(`${nameof(parameters.quickReplyOptions)}.${nameof(QuickReplyOption.prototype.label)}`,
            this.Limits.MESSAGE_QUICK_REPLY_LABEL_MAX_LENGTH, nameof(this.Limits.MESSAGE_QUICK_REPLY_LABEL_MAX_LENGTH), "characters per quick option label");
        }

        if (parameters.quickReplyOptions.some(x => x.metadata.UTF32Length() > this.Limits.MESSAGE_QUICK_REPLY_METADATA_MAX_LENGTH)) {
          throw new TwitterArgumentLimitException(`${nameof(parameters.quickReplyOptions)}`,
            this.Limits.MESSAGE_QUICK_REPLY_METADATA_MAX_LENGTH, nameof(this.Limits.MESSAGE_QUICK_REPLY_METADATA_MAX_LENGTH), "characters per quick option metadata ");
        }
      }
    } else if (MessagesClientParametersValidator.isIGetMessagesParameters(parameters)) {
      let maxPageSize = this.Limits.MESSAGES_GET_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.MESSAGES_GET_MAX_PAGE_SIZE), "page size");
      }
    }
  }

  private static isIPublishMessageParameters(parameters: MessagesParameters): parameters is IPublishMessageParameters {
    return (parameters as IPublishMessageParameters).mediaId !== undefined;
  }

  private static isIGetMessagesParameters(parameters: MessagesParameters): parameters is IGetMessagesParameters {
    return (parameters as IGetMessagesParameters).cursor !== undefined;
  }
}
