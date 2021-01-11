import {forkJoin} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {About} from "../../shared/models/server/about.model";
import {ServerConfig} from "../../shared/models/server/server-config.model";
import {InstanceService} from "../../shared/shared-instance/instance.service";
import {ServerService} from "../../core/server";

export type ResolverData = { about: About, languages: string[], categories: string[], serverConfig: ServerConfig };

@Injectable()
export class AboutInstanceResolver implements Resolve<any> {

  constructor(
    private instanceService: InstanceService,
    private serverService: ServerService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.instanceService.getAbout()
      .pipe(
        switchMap(about => {
          return forkJoin([
            this.instanceService.buildTranslatedLanguages(about),
            this.instanceService.buildTranslatedCategories(about),
            this.serverService.getConfig()
          ]).pipe(map(([languages, categories, serverConfig]) => ({about, languages, categories, serverConfig})));
        })
      );
  }
}
