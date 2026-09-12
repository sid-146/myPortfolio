import React from "react";

interface Metric {
    label: string;
    value: string;
    change?: string;
}

interface MetricsGridProps {
    metrics: Metric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
    if (!metrics || metrics.length === 0) return null;

    return (
        <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {metrics.map((metric, i) => (
                <div
                    key={i}
                    className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface-muted/60 flex flex-col justify-between"
                >
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                        {metric.label}
                    </span>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                            {metric.value}
                        </span>
                        {metric.change && (
                            <span className="text-[11px] font-mono text-zinc-500">
                                {metric.change}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
