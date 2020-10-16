import {IGetAccountActivityWebhookEnvironmentsResultDTO} from "../../../Public/Models/Interfaces/DTO/Webhooks/IGetAccountActivityWebhookEnvironmentsResultDTO";
import {IWebhookEnvironmentDTO} from "../../../Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentDTO";

export class GetAccountActivityWebhookEnvironmentsResultDTO implements IGetAccountActivityWebhookEnvironmentsResultDTO {
  public environments: IWebhookEnvironmentDTO[];
}
