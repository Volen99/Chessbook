export interface ChartData {
  chartLabel: string;
  axisXLabels: string[];
  linesData: number[][];
  legend: string[];
}

export interface AggregatedChartData extends ChartData {
  aggregatedData: ChartSummary[];
}

export interface ChartSummary {
  title: string;
  value: number;
}
