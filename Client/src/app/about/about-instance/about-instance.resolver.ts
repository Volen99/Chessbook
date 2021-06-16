import {forkJoin} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {About} from "../../shared/models/server/about.model";
import {InstanceService} from "../../shared/shared-instance/instance.service";



export type ResolverData = { about: About, languages: string[], categories: string[] };

@Injectable()
export class AboutInstanceResolver implements Resolve<any> {

  constructor(private instanceService: InstanceService) {
  }

  resolve() {
    // return this.instanceService.getAbout()
    //   .pipe(
    //     switchMap(about => {
    //       return forkJoin([
    //         this.instanceService.buildTranslatedLanguages(about),
    //         this.instanceService.buildTranslatedCategories(about)
    //       ]).pipe(map(([languages, categories]) => ({about, languages, categories}) as ResolverData));
    //     })
    //   );
  }
}
