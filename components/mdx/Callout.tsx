import {
    AlertCircle,
    Info,
    CheckCircle2,
    AlertTriangle,
    Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
    type?: "info" | "warning" | "success" | "danger" | "architecture";
    title?: string;
    children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
    const getIcon = () => {
        switch (type) {
            case "warning":
                return (
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                );
            case "success":
                return (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                );
            case "danger":
                return (
                    <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                );
            case "architecture":
                return <Cpu className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />;
            default:
                return (
                    <Info className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
                );
        }
    };

    const getStyles = () => {
        switch (type) {
            case "warning":
                return "border-amber-500/30 bg-amber-500/5 text-amber-950 dark:text-amber-200";
            case "success":
                return "border-emerald-500/30 bg-emerald-500/5 text-emerald-950 dark:text-emerald-200";
            case "danger":
                return "border-rose-500/30 bg-rose-500/5 text-rose-950 dark:text-rose-200";
            case "architecture":
                return "border-sky-500/30 bg-sky-500/5 text-sky-950 dark:text-sky-200";
            default:
                return "border-zinc-300 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/40 text-zinc-900 dark:text-zinc-300";
        }
    };

    return (
        <div className={cn("my-6 rounded-lg border p-4 text-sm", getStyles())}>
            <div className="flex items-start gap-2.5">
                {getIcon()}
                <div className="flex-1 space-y-1">
                    {title && (
                        <p className="font-semibold text-xs uppercase tracking-wider">
                            {title}
                        </p>
                    )}
                    <div className="text-xs sm:text-sm leading-relaxed prose-p:my-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
