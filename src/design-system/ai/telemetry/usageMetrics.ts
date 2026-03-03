export interface UsageMetric {
  metricType:
    | "component_used"
    | "rule_violation"
    | "token_override"
    | "strict_mode_failure";
  name: string;
  value?: number;
  timestamp?: string;
}

const usageStore: Record<string, number> = {};

export function recordUsageMetric(metric: UsageMetric): void {
  const key = `${metric.metricType}:${metric.name}`;
  usageStore[key] = (usageStore[key] ?? 0) + (metric.value ?? 1);
}

export function getUsageMetrics(): Record<string, number> {
  return { ...usageStore };
}

export function resetUsageMetrics(): void {
  Object.keys(usageStore).forEach((key) => {
    delete usageStore[key];
  });
}
