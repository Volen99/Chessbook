import {JsonProperty} from "json2typescript";

import {IApp} from "../../../Public/Models/Interfaces/IApp";

export class App implements IApp {
  @JsonProperty("id", Number)
  public id: number;

  @JsonProperty("name", String)
  public name: string;

  @JsonProperty("url", String)
  public url: string;
}
