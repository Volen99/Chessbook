import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';

export interface IMessageQueryExecutor {
  // Publish Message
  PublishMessageAsync(parameters: IPublishMessageParameters, request: ITwitterRequest): Task<ITwitterResult<ICreateMessageDTO>>

  DestroyMessageAsync(parameters: IDeleteMessageParameters, request: ITwitterRequest): Task<ITwitterResult>

  GetMessageAsync(parameters: IGetMessageParameters, request: ITwitterRequest): Task<ITwitterResult<IGetMessageDTO>>

  GetMessagesAsync(parameters: IGetMessagesParameters, request: TwitterRequest): Task<ITwitterResult<IMessageCursorQueryResultDTO>>
}

export class MessageQueryExecutor implements IMessageQueryExecutor {
  private readonly _twitterAccessor: ITwitterAccessor;
  private readonly _messageQueryGenerator: IMessageQueryGenerator;

  constructor(twitterAccessor: ITwitterAccessor, messageQueryGenerator: IMessageQueryGenerator) {
    this._twitterAccessor = twitterAccessor;
    this._messageQueryGenerator = messageQueryGenerator;
  }

  public PublishMessageAsync(parameters: IPublishMessageParameters, request: ITwitterRequest): Task<ITwitterResult<ICreateMessageDTO>> {
    var requestWithPayload = this._messageQueryGenerator.GetPublishMessageQuery(parameters);

    request.query.url = requestWithPayload.Url;
    request.query.httpMethod = HttpMethod.POST;
    request.query.httpContent = requestWithPayload.Content;

    return this._twitterAccessor.executeRequestAsync<ICreateMessageDTO>(request);
  }

  public DestroyMessageAsync(parameters: IDeleteMessageParameters, request: ITwitterRequest): Task<ITwitterResult> {
    request.query.url = this._messageQueryGenerator.GetDestroyMessageQuery(parameters);
    request.query.httpMethod = HttpMethod.DELETE;
    return this._twitterAccessor.executeRequestAsync(request);
  }

  public GetMessageAsync(parameters: IGetMessageParameters, request: ITwitterRequest): Task<ITwitterResult<IGetMessageDTO>> {
    request.query.url = this._messageQueryGenerator.GetMessageQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IGetMessageDTO>(request);
  }

  public GetMessagesAsync(parameters: IGetMessagesParameters, request: TwitterRequest): Task<ITwitterResult<IMessageCursorQueryResultDTO>> {
    request.query.url = this._messageQueryGenerator.GetMessagesQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IMessageCursorQueryResultDTO>(request);
  }
}
