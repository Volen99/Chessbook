import {ITweetTextParts} from "../../Public/Models/Interfaces/ITweetTextParts";
import Regex from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/RegularExpressions";

export class TweetTextParts implements ITweetTextParts {
  constructor(text: string) {
    let regex: Regex = new Regex("^(?<prefix>(?:(?<mention>@[a-zA-Z0-9]+)\s){0,50})?(?<content>.+)");

    let stringMatches = regex.match(text);

    let prefix = stringMatches.groups["prefix"];
    let content = stringMatches.groups["content"];

    this.prefix = prefix.Value;
    this.content = content.Value;

    let mentionCaptures = stringMatches.groups["mention"].Captures;

    let mentions = new Array<string>();
    for (let mention of mentionCaptures) {
      mentions.push(mention.ToString());
    }

    this.mentions = mentions;
  }

  public content: string;
  public prefix: string;
  public mentions: string[];
}
