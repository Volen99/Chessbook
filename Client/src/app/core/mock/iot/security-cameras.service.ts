import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Camera, SecurityCamerasData } from '../../interfaces/iot/security-cameras';
import {IMediaEntity} from "../../../shared/post-object/Entities/interfaces/IMediaEntity";
import {PostsService} from "../../../shared/posts/posts.service";

@Injectable()
export class SecurityCamerasService extends SecurityCamerasData {

  constructor(private postService: PostsService) {
    super();
  }

  getCamerasData(postId: number): Observable<IMediaEntity[]> {
    return this.postService.getPostPhotos(postId);
  }
}
