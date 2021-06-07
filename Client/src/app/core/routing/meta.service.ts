import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ServerService} from "../server/server.service";
import {HTMLServerConfig} from "../../shared/models/server/server-config.model";

export interface MetaSettings {
  title?: string
}

@Injectable()
export class MetaService {
  private config: HTMLServerConfig;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private server: ServerService
  ) {
    this.config = this.server.getTmpConfig();
    this.server.getConfig()
      .subscribe(config => this.config = config);
  }

  setTitle(subTitle?: string) {
    debugger
    let title = '';
    if (subTitle) title += `${subTitle} / `;

    title += this.config.instance.name;

    this.titleService.setTitle(title);
  }

  setTag(name: string, value: string) {
    this.meta.addTag({name, content: value});
  }

  update(meta: MetaSettings) {
    this.setTitle(meta.title);
  }
}
