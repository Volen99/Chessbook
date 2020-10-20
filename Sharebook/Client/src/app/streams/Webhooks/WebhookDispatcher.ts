import {IWebhookDispatcher} from "../../core/Public/Streaming/Webhooks/IWebhookDispatcher";
import List from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/List";
import {IAccountActivityStream} from "../../core/Public/Streaming/IAccountActivityStream";
import {IWebhookMessage} from "../../core/Public/Models/Webhooks/WebhookMessage";

export class WebhookDispatcher implements IWebhookDispatcher
    {
        private readonly _jObjectStaticWrapper: IJObjectStaticWrapper;
        private readonly _accountActivityStream: List<IAccountActivityStream>;

        constructor(jObjectStaticWrapper: IJObjectStaticWrapper)
        {
            this._jObjectStaticWrapper = jObjectStaticWrapper;
            this._accountActivityStream = new List<IAccountActivityStream>();
        }

        get SubscribedAccountActivityStreams(): IAccountActivityStream[] {
          return this._accountActivityStream.toArray();
        }

        public  WebhookMessageReceived(message: IWebhookMessage): void
        {
            let jsonObjectEvent = this._jObjectStaticWrapper.GetJobjectFromJson(message.json);
            let userId = jsonObjectEvent["for_user_id"].ToString();

            this._accountActivityStream.ForEach(activityStream =>
            {
                var isTargetingActivityStream = activityStream.AccountUserId.ToString() == userId;
                if (isTargetingActivityStream)
                {
                    activityStream.WebhookMessageReceived(message);
                }
            });
        }

        public  SubscribeAccountActivityStream(accountActivityStream: IAccountActivityStream): void
        {
            if (this._accountActivityStream.Contains(accountActivityStream))
            {
                return;
            }

            this._accountActivityStream.Add(accountActivityStream);
        }

        public  UnsubscribeAccountActivityStream(accountActivityStream: IAccountActivityStream): void
        {
            this._accountActivityStream.Remove(accountActivityStream);
        }
    }
}
