import { Observable } from 'rxjs';
import {IMediaEntity} from "../../../shared/post-object/Entities/interfaces/IMediaEntity";

export interface Camera {
  title: string;
  source: string;
}

export abstract class SecurityCamerasData {
  abstract getCamerasData(postId: number): Observable<IMediaEntity[]>;
}
