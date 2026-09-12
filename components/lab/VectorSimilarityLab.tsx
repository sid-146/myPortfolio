"use client";

import { useState, useMemo } from "react";
import { Compass, RefreshCw } from "lucide-react";

export function VectorSimilarityLab() {
    const [vecA, setVecA] = useState<{ x: number; y: number }>({ x: 4, y: 3 });
    const [vecB, setVecB] = useState<{ x: number; y: number }>({ x: 2, y: 5 });

    const metrics = useMemo(() => {
        const dotProduct = vecA.x * vecB.x + vecA.y * vecB.y;
        const magA = Math.sqrt(vecA.x * vecA.x + vecA.y * vecA.y);
        const magB = Math.sqrt(vecB.x * vecB.x + vecB.y * vecB.y);
        const cosineSim = magA * magB > 0 ? dotProduct / (magA * magB) : 0;
        const euclideanDist = Math.sqrt(
            Math.pow(vecA.x - vecB.x, 2) + Math.pow(vecA.y - vecB.y, 2),
        );
        const angleRad = Math.acos(Math.max(-1, Math.min(1, cosineSim)));
        const angleDeg = (angleRad * (180 / Math.PI)).toFixed(1);

        return {
            dotProduct: dotProduct.toFixed(2),
            magA: magA.toFixed(2),
            magB: magB.toFixed(2),
            cosineSim: cosineSim.toFixed(4),
            euclideanDist: euclideanDist.toFixed(2),
            angleDeg,
        };
    }, [vecA, vecB]);

    // Coordinate mapping for SVG (centered at 150, 150; scale factor 20)
    const originX = 150;
    const originY = 150;
    const scale = 18;

    const aX = originX + vecA.x * scale;
    const aY = originY - vecA.y * scale;
    const bX = originX + vecB.x * scale;
    const bY = originY - vecB.y * scale;

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-surface p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                    <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Compass className="h-4 w-4 text-emerald-500" />
                        Vector Cosine Similarity & Distance Simulator
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                        Visualizes semantic embedding vector geometry, cosine
                        metrics, and geometric distances.
                    </p>
                </div>

                {/* Cosine Metric Pill */}
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-right">
                        <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 block">
                            Cosine Similarity
                        </span>
                        <span className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {metrics.cosineSim}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* SVG Plot */}
                <div className="relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 dark:bg-[#0c0c0e] p-4 flex items-center justify-center">
                    <svg width="300" height="300" className="overflow-visible">
                        {/* Grid lines */}
                        {[-6, -4, -2, 2, 4, 6].map((gridVal) => (
                            <g key={gridVal}>
                                <line
                                    x1={originX + gridVal * scale}
                                    y1="20"
                                    x2={originX + gridVal * scale}
                                    y2="280"
                                    stroke="#27272a"
                                    strokeWidth="1"
                                    strokeDasharray="2,2"
                                />
                                <line
                                    x1="20"
                                    y1={originY + gridVal * scale}
                                    x2="280"
                                    y2={originY + gridVal * scale}
                                    stroke="#27272a"
                                    strokeWidth="1"
                                    strokeDasharray="2,2"
                                />
                            </g>
                        ))}

                        {/* Axes */}
                        <line
                            x1="10"
                            y1={originY}
                            x2="290"
                            y2={originY}
                            stroke="#52525b"
                            strokeWidth="1.5"
                        />
                        <line
                            x1={originX}
                            y1="10"
                            x2={originX}
                            y2="290"
                            stroke="#52525b"
                            strokeWidth="1.5"
                        />

                        {/* Vector A (Emerald) */}
                        <line
                            x1={originX}
                            y1={originY}
                            x2={aX}
                            y2={aY}
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <circle cx={aX} cy={aY} r="5" fill="#10b981" />
                        <text
                            x={aX + 8}
                            y={aY - 4}
                            fill="#10b981"
                            fontSize="12"
                            fontFamily="monospace"
                        >
                            Vector A ({vecA.x}, {vecA.y})
                        </text>

                        {/* Vector B (Sky Blue) */}
                        <line
                            x1={originX}
                            y1={originY}
                            x2={bX}
                            y2={bY}
                            stroke="#0284c7"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <circle cx={bX} cy={bY} r="5" fill="#0284c7" />
                        <text
                            x={bX + 8}
                            y={bY + 12}
                            fill="#38bdf8"
                            fontSize="12"
                            fontFamily="monospace"
                        >
                            Vector B ({vecB.x}, {vecB.y})
                        </text>
                    </svg>
                </div>

                {/* Controls & Breakdown */}
                <div className="space-y-4 font-mono text-xs">
                    {/* Vector A Slider */}
                    <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                        <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                            <span>Vector A (Target Embedding)</span>
                            <span>Magnitude: {metrics.magA}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="space-y-1 block">
                                <span className="text-zinc-500">
                                    X: {vecA.x}
                                </span>
                                <input
                                    type="range"
                                    min="-6"
                                    max="6"
                                    step="0.5"
                                    value={vecA.x}
                                    onChange={(e) =>
                                        setVecA({
                                            ...vecA,
                                            x: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full accent-emerald-500"
                                />
                            </label>
                            <label className="space-y-1 block">
                                <span className="text-zinc-500">
                                    Y: {vecA.y}
                                </span>
                                <input
                                    type="range"
                                    min="-6"
                                    max="6"
                                    step="0.5"
                                    value={vecA.y}
                                    onChange={(e) =>
                                        setVecA({
                                            ...vecA,
                                            y: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full accent-emerald-500"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Vector B Slider */}
                    <div className="p-3.5 rounded-lg border border-sky-500/20 bg-sky-500/5 space-y-2">
                        <div className="flex justify-between font-semibold text-sky-600 dark:text-sky-400">
                            <span>Vector B (Query Embedding)</span>
                            <span>Magnitude: {metrics.magB}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="space-y-1 block">
                                <span className="text-zinc-500">
                                    X: {vecB.x}
                                </span>
                                <input
                                    type="range"
                                    min="-6"
                                    max="6"
                                    step="0.5"
                                    value={vecB.x}
                                    onChange={(e) =>
                                        setVecB({
                                            ...vecB,
                                            x: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full accent-sky-500"
                                />
                            </label>
                            <label className="space-y-1 block">
                                <span className="text-zinc-500">
                                    Y: {vecB.y}
                                </span>
                                <input
                                    type="range"
                                    min="-6"
                                    max="6"
                                    step="0.5"
                                    value={vecB.y}
                                    onChange={(e) =>
                                        setVecB({
                                            ...vecB,
                                            y: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full accent-sky-500"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Math metrics summary */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-[11px]">
                        <div className="p-2.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface-muted text-center">
                            <span className="text-zinc-500 block uppercase text-[10px]">
                                Dot Product
                            </span>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                {metrics.dotProduct}
                            </span>
                        </div>
                        <div className="p-2.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface-muted text-center">
                            <span className="text-zinc-500 block uppercase text-[10px]">
                                Angle (θ)
                            </span>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                {metrics.angleDeg}°
                            </span>
                        </div>
                        <div className="p-2.5 rounded border border-zinc-200 dark:border-zinc-800 bg-surface-muted text-center">
                            <span className="text-zinc-500 block uppercase text-[10px]">
                                L2 Distance
                            </span>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                {metrics.euclideanDist}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end pt-1">
                        <button
                            onClick={() => {
                                setVecA({ x: 5, y: 1 });
                                setVecB({ x: 5, y: 1.2 });
                            }}
                            className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                            <RefreshCw size={12} />
                            Simulate High Semantic Similarity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
