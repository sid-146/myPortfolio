import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "default" | "prose" | "wide";
}

export function Container({
    children,
    className,
    size = "default",
    ...props
}: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full px-4 sm:px-6 lg:px-8",
                size === "prose" && "max-w-3xl",
                size === "default" && "max-w-4xl",
                size === "wide" && "max-w-5xl",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
