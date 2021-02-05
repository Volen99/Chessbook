import { Observable } from 'rxjs';
import { ChartSummary, ChartData } from '../common/chart';

export abstract class OrdersProfitChartData {
  abstract getOrderProfitChartSummary(): Observable<ChartSummary[]>;
  abstract getOrdersChartData(period: string): Observable<ChartData>;
  abstract getProfitChartData(period: string): Observable<ChartData>;
}
