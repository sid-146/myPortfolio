"use client";

import { useState, useMemo } from "react";
import { RefreshCw, Zap } from "lucide-react";

export function AttentionVisualizer() {
    const [inputText, setInputText] = useState(
        "AI systems scale through memory efficiency",
    );
    const [temperature, setTemperature] = useState<number>(1.0);

    const tokens = useMemo(() => {
        return inputText.trim().split(/\s+/).filter(Boolean).slice(0, 8);
    }, [inputText]);

    // Compute a deterministic pseudo-embedding matrix and QK^T attention weights for demonstration
    const attentionMatrix = useMemo(() => {
        const N = tokens.length;
        if (N === 0) return [];

        // Deterministic pseudo vectors for each token based on char codes
        const qVectors = tokens.map((token, i) => {
            let hash = 0;
            for (let c = 0; c < token.length; c++)
                hash += token.charCodeAt(c) * (c + 1);
            return [
                Math.sin(hash + i),
                Math.cos(hash * 0.5 + i),
                Math.sin(hash * 0.2),
            ];
        });

        const kVectors = tokens.map((token, j) => {
            let hash = 0;
            for (let c = 0; c < token.length; c++)
                hash += token.charCodeAt(c) * (c + 2);
            return [
                Math.sin(hash + j * 0.8),
                Math.cos(hash * 0.4 + j),
                Math.sin(hash * 0.1),
            ];
        });

        const d_k = 3;
        const scale = Math.sqrt(d_k);

        const matrix: number[][] = [];
        for (let i = 0; i < N; i++) {
            const rowScores: number[] = [];
            for (let j = 0; j < N; j++) {
                // Dot product
                const dot =
                    qVectors[i][0] * kVectors[j][0] +
                    qVectors[i][1] * kVectors[j][1] +
                    qVectors[i][2] * kVectors[j][2];
                rowScores.push(dot / (scale * Math.max(0.1, temperature)));
            }

            // Softmax over row
            const maxScore = Math.max(...rowScores);
            const exps = rowScores.map((s) => Math.exp(s - maxScore));
            const sumExps = exps.reduce((a, b) => a + b, 0);
            const rowSoftmax = exps.map((e) => e / sumExps);
            matrix.push(rowSoftmax);
        }

        return matrix;
    }, [tokens, temperature]);

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-surface p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                    <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-emerald-500" />
                        Interactive Attention Matrix & Softmax Heatmap
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                        Computes scaled dot-product attention scores
                        Softmax(QK^T / (τ √d_k)).
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                        <span>Temp (τ):</span>
                        <input
                            type="range"
                            min="0.2"
                            max="2.0"
                            step="0.1"
                            value={temperature}
                            onChange={(e) =>
                                setTemperature(parseFloat(e.target.value))
                            }
                            className="w-20 accent-emerald-500"
                        />
                        <span className="w-8 font-semibold text-zinc-800 dark:text-zinc-200">
                            {temperature.toFixed(1)}
                        </span>
                    </label>
                </div>
            </div>

            {/* Input query */}
            <div className="mt-4">
                <label className="block text-xs font-mono text-zinc-500 mb-1.5">
                    Sequence Input (up to 8 tokens):
                </label>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full rounded border border-zinc-200 dark:border-zinc-800 bg-surface-muted px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500 text-zinc-900 dark:text-zinc-100"
                    placeholder="Type words separated by spaces..."
                />
            </div>

            {/* Heatmap Matrix Display */}
            {tokens.length > 0 ? (
                <div className="mt-6 overflow-x-auto">
                    <div className="min-w-[450px]">
                        {/* Top Column Labels (Keys) */}
                        <div className="flex items-center pl-28 mb-2">
                            {tokens.map((token, j) => (
                                <div
                                    key={j}
                                    className="flex-1 text-center font-mono text-[11px] text-zinc-600 dark:text-zinc-400 font-medium truncate px-1"
                                    title={`Key: ${token}`}
                                >
                                    {token}
                                </div>
                            ))}
                        </div>

                        {/* Matrix Rows (Queries) */}
                        <div className="space-y-1.5">
                            {tokens.map((qToken, i) => (
                                <div key={i} className="flex items-center">
                                    <div
                                        className="w-28 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 font-medium truncate pr-3 text-right"
                                        title={`Query: ${qToken}`}
                                    >
                                        {qToken}
                                    </div>
                                    <div className="flex-1 flex gap-1.5">
                                        {attentionMatrix[i]?.map(
                                            (weight, j) => {
                                                const opacity = Math.max(
                                                    0.08,
                                                    weight,
                                                );
                                                return (
                                                    <div
                                                        key={j}
                                                        style={{
                                                            backgroundColor: `rgba(16, 185, 129, ${opacity})`,
                                                        }}
                                                        className="flex-1 h-9 rounded border border-emerald-500/20 flex items-center justify-center font-mono text-[10px] text-zinc-900 dark:text-zinc-100 transition-all hover:scale-105 cursor-pointer"
                                                        title={`Query: "${qToken}" -> Key: "${tokens[j]}": ${(weight * 100).toFixed(1)}%`}
                                                    >
                                                        {(weight * 100).toFixed(
                                                            0,
                                                        )}
                                                        %
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="mt-6 text-xs font-mono text-zinc-500">
                    Please enter some text above.
                </p>
            )}

            {/* Legend & Explanation */}
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                    <span>Attention Intensity:</span>
                    <span className="inline-block w-4 h-3 rounded bg-emerald-500/10 border border-emerald-500/20" />
                    <span>Low (0%)</span>
                    <span className="inline-block w-4 h-3 rounded bg-emerald-500 border border-emerald-500" />
                    <span>High (100%)</span>
                </div>
                <button
                    onClick={() =>
                        setInputText(
                            "Attention mechanisms unlock linear scaling through FlashAttention",
                        )
                    }
                    className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                    <RefreshCw size={11} />
                    Load sample prompt
                </button>
            </div>
        </div>
    );
}
