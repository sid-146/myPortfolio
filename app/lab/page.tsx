import { Container } from "@/components/layout/Container";
import { AttentionVisualizer } from "@/components/lab/AttentionVisualizer";
import { TokenizerExplorer } from "@/components/lab/TokenizerExplorer";
import { VectorSimilarityLab } from "@/components/lab/VectorSimilarityLab";
import { Sparkles, Cpu, FlaskConical } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lab & Experiments",
    description:
        "Interactive AI systems simulations, tokenization playgrounds, and mathematical visualizers by Sudhanwa Kaveeshwar.",
};

export default function LabPage() {
    return (
        <Container size="wide" className="py-12 sm:py-16 space-y-12">
            {/* Header */}
            <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    <FlaskConical size={14} />
                    <span>interactive_experiments.ts</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Engineering Lab
                </h1>
                <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-2xl">
                    Live, browser-based interactive experiments, deep learning
                    simulations, and mathematical tooling.
                </p>
            </div>

            {/* Lab Demos */}
            <div className="space-y-12">
                {/* Lab 1: Attention Matrix & Softmax Visualizer */}
                <section id="attention-visualizer" className="space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                            LAB-01
                        </span>
                        <span>•</span>
                        <span>Transformer Attention Mechanics</span>
                    </div>
                    <AttentionVisualizer />
                </section>

                {/* Lab 2: Tokenizer & BPE Sandbox */}
                <section id="tokenizer-explorer" className="space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                            LAB-02
                        </span>
                        <span>•</span>
                        <span>Subword Tokenization & Byte-Pair Encoding</span>
                    </div>
                    <TokenizerExplorer />
                </section>

                {/* Lab 3: Vector Cosine Similarity Lab */}
                <section id="vector-similarity" className="space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                            LAB-03
                        </span>
                        <span>•</span>
                        <span>Embedding Geometry & Metric Spaces</span>
                    </div>
                    <VectorSimilarityLab />
                </section>
            </div>
        </Container>
    );
}
