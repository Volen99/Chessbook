import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {ServerService} from '../server';
import {ServerConfig} from "../../shared/models/server/server-config.model";

@Injectable()
export class ServerConfigResolver implements Resolve<ServerConfig> {
  constructor(private server: ServerService) {
  }

  resolve() {
    return this.server.getConfig();
  }
}
