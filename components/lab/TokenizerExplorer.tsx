"use client";

import { useState, useMemo } from "react";
import { Cpu, RefreshCw, Hash, FileCode } from "lucide-react";

interface SubwordToken {
    text: string;
    id: number;
    byteCount: number;
    color: string;
}

const PALETTE = [
    "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300",
    "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-300",
    "bg-pink-500/15 border-pink-500/30 text-pink-700 dark:text-pink-300",
    "bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-300",
];

export function TokenizerExplorer() {
    const [inputText, setInputText] = useState(
        "Vectorized SIMD processing in Rust accelerates Apache Arrow pipelines by 4.2x.",
    );

    const tokens = useMemo<SubwordToken[]>(() => {
        if (!inputText) return [];

        // Realistic subword/BPE style segmentation heuristic
        const rawChunks = inputText.match(/([A-Za-z]+|\d+|[^\w\s]|\s+)/g) || [];
        const result: SubwordToken[] = [];

        rawChunks.forEach((chunk, chunkIdx) => {
            // Split longer words into subword pieces (e.g. Vector + ized, process + ing)
            if (chunk.length > 5 && /^[A-Za-z]+$/.test(chunk)) {
                const mid = Math.min(
                    chunk.length - 3,
                    Math.max(3, Math.floor(chunk.length / 2)),
                );
                const p1 = chunk.slice(0, mid);
                const p2 = chunk.slice(mid);

                [p1, p2].forEach((sub) => {
                    let hash = 1000;
                    for (let i = 0; i < sub.length; i++)
                        hash = (hash * 31 + sub.charCodeAt(i)) % 50257;
                    result.push({
                        text: sub,
                        id: Math.abs(hash),
                        byteCount: new TextEncoder().encode(sub).length,
                        color: PALETTE[result.length % PALETTE.length],
                    });
                });
            } else {
                let hash = 1000;
                for (let i = 0; i < chunk.length; i++)
                    hash = (hash * 31 + chunk.charCodeAt(i)) % 50257;
                result.push({
                    text: chunk,
                    id: Math.abs(hash),
                    byteCount: new TextEncoder().encode(chunk).length,
                    color: PALETTE[result.length % PALETTE.length],
                });
            }
        });

        return result;
    }, [inputText]);

    const totalCharacters = inputText.length;
    const totalTokens = tokens.length;
    const totalBytes = new TextEncoder().encode(inputText).length;
    const compressionRatio =
        totalTokens > 0 ? (totalCharacters / totalTokens).toFixed(2) : "0.00";

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-surface p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                    <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-emerald-500" />
                        Subword Tokenizer & Byte-Pair Encoding Sandbox
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                        Simulates subword tokenization, vocabulary mapping, and
                        compression metrics.
                    </p>
                </div>

                {/* Stats strip */}
                <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                        <span className="text-zinc-500 block text-[10px] uppercase">
                            Tokens
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                            {totalTokens}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-zinc-500 block text-[10px] uppercase">
                            Chars / Token
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {compressionRatio}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-zinc-500 block text-[10px] uppercase">
                            Bytes
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                            {totalBytes}
                        </span>
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="mt-4">
                <label className="block text-xs font-mono text-zinc-500 mb-1.5">
                    Input Prompt / Code:
                </label>
                <textarea
                    rows={3}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full rounded border border-zinc-200 dark:border-zinc-800 bg-surface-muted px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500 text-zinc-900 dark:text-zinc-100"
                    placeholder="Paste or write text to tokenize..."
                />
            </div>

            {/* Visual Token Boundaries */}
            <div className="mt-5">
                <label className="block text-xs font-mono text-zinc-500 mb-2">
                    Token Segmentation (Each color is an individual token):
                </label>
                <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 dark:bg-[#0c0c0e] min-h-[80px] flex flex-wrap gap-1 items-center font-mono text-xs">
                    {tokens.map((token, i) => (
                        <span
                            key={i}
                            className={`inline-flex items-center px-1.5 py-0.5 rounded border ${token.color} transition-all hover:scale-105 cursor-pointer`}
                            title={`Token #${i + 1} | ID: ${token.id} | Bytes: ${token.byteCount}`}
                        >
                            {token.text
                                .replace(/ /g, "␣")
                                .replace(/\n/g, "\\n")}
                        </span>
                    ))}
                </div>
            </div>

            {/* Token Table */}
            <div className="mt-5">
                <label className="block text-xs font-mono text-zinc-500 mb-2">
                    Token ID Stream:
                </label>
                <div className="max-h-40 overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <table className="w-full text-left font-mono text-[11px]">
                        <thead className="bg-surface-muted border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                            <tr>
                                <th className="px-3 py-1.5">Index</th>
                                <th className="px-3 py-1.5">Token Text</th>
                                <th className="px-3 py-1.5">Vocabulary ID</th>
                                <th className="px-3 py-1.5">Bytes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
                            {tokens.map((t, idx) => (
                                <tr
                                    key={idx}
                                    className="hover:bg-surface-muted/40"
                                >
                                    <td className="px-3 py-1 text-zinc-400">
                                        #{idx}
                                    </td>
                                    <td className="px-3 py-1 font-semibold text-zinc-800 dark:text-zinc-200">
                                        {JSON.stringify(t.text)}
                                    </td>
                                    <td className="px-3 py-1 text-emerald-600 dark:text-emerald-400">
                                        {t.id}
                                    </td>
                                    <td className="px-3 py-1 text-zinc-500">
                                        {t.byteCount} B
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={() =>
                        setInputText(
                            "FlashAttention avoids intermediate HBM reads and writes by tiling Q, K, V blocks into on-chip SRAM.",
                        )
                    }
                    className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                    <RefreshCw size={12} />
                    Load sample text
                </button>
            </div>
        </div>
    );
}
