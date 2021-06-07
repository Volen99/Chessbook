import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {catchError, map, takeUntil} from 'rxjs/operators';
import {Camera, SecurityCamerasData} from "../../../../core/interfaces/iot/security-cameras";
import {NbComponentSize} from "../../../../sharebook-nebular/theme/components/component-size";
import {NbThemeService} from "../../../../sharebook-nebular/theme/services/theme.service";
import {NbMediaBreakpointsService} from "../../../../sharebook-nebular/theme/services/breakpoints.service";
import {forkJoin, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {IMediaEntity} from "../../../post-object/Entities/interfaces/IMediaEntity";
import {HttpStatusCode} from "../../../core-utils/miscs";

@Component({
  selector: 'app-post-media-detail',
  templateUrl: './post-media-detail.component.html',
  styleUrls: ['./post-media-detail.component.scss']
})
export class PostMediaDetailComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  private destroy$ = new Subject<void>();

  cameras: IMediaEntity[];
  selectedCamera: IMediaEntity;
  isSingleView = false;
  actionSize: NbComponentSize = 'medium';

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private securityCamerasService: SecurityCamerasData,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(routeParams => {
      const postId = routeParams['id'];
      const photoId = routeParams['photoId'];   // TODO: fix if it is null
      debugger
      if (postId && photoId) {
        this.securityCamerasService.getCamerasData(postId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((cameras: IMediaEntity[]) => {
            this.cameras = cameras;
            this.selectedCamera = this.cameras[photoId - 1];
            this.isSingleView = true;
          });

        const breakpoints = this.breakpointService.getBreakpointsMap();
        this.themeService.onMediaQueryChange()
          .pipe(map(([, breakpoint]) => breakpoint.width))
          .subscribe((width: number) => {
            this.actionSize = width > breakpoints.md ? 'medium' : 'small';
          });
      }
    });


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }

}
