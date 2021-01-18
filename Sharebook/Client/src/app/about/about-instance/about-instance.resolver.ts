import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ServerService } from '../../core';
import { About, ServerConfig } from '../../shared/models/server';
import { InstanceService } from '../../shared/shared-instance/instance.service';

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
          ]).pipe(map(([ languages, categories, serverConfig ]) => ({
            about,
            languages,
            categories,
            serverConfig
          })));
        })
      );
  }
}
