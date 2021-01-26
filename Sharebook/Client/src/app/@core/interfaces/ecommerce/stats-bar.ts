import { Observable } from 'rxjs';
import { AggregatedChartData } from '../common/chart';

export abstract class StatsBarData {
  abstract getStatsBarData(): Observable<AggregatedChartData>;
}
