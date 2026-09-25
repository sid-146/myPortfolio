import React from "react";
import { cn } from "@/lib/utils";

interface Metric {
    label: string;
    value: string;
    change?: string;
}

interface MetricsGridProps {
    metrics: Metric[];
}

function getValueFontSize(value: string): string {
    if (!value) return "text-xl sm:text-2xl";
    if (value.length > 18) return "text-xs sm:text-sm leading-snug";
    if (value.length > 12) return "text-sm sm:text-base leading-snug";
    if (value.length > 8) return "text-base sm:text-lg leading-tight";
    return "text-xl sm:text-2xl leading-tight";
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
    if (!metrics || metrics.length === 0) return null;

    return (
        <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {metrics.map((metric, i) => (
                <div
                    key={i}
                    className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-surface-muted/60 flex flex-col justify-between min-w-0 overflow-hidden"
                >
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider truncate mb-1">
                        {metric.label}
                    </span>
                    <div className="mt-1 flex items-baseline gap-2 min-w-0 flex-wrap">
                        <span
                            className={cn(
                                "font-mono font-bold tracking-tight text-emerald-600 dark:text-emerald-400 break-words [overflow-wrap:anywhere]",
                                getValueFontSize(metric.value)
                            )}
                        >
                            {metric.value}
                        </span>
                        {metric.change && (
                            <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                                {metric.change}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
