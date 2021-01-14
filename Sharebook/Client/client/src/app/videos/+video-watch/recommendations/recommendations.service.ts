import { Observable } from 'rxjs';
import { RecommendationInfo } from './recommendation-info.model';
import { Video } from '../../../shared/shared-main';

export interface RecommendationService {
  getRecommendations(recommendation: RecommendationInfo): Observable<Video[]>;
}
