export default interface IStatistic {
  size?: { width: number; height: number };
  hits?: number;
  misses?: number;
  remaining?: string;
}
