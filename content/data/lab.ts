export const labData = [
  {
    title: "Attention Matrix & Softmax Heatmap Visualizer",
    slug: "attention-visualizer",
    description:
      "Interactive visualizer demonstrating how Query and Key vector dot-products generate attention scores across sequence tokens with scaled softmax normalization.",
    category: "GenAI" as const,
    date: "2026-08-15",
    status: "Interactive" as const,
    tags: ["Transformers", "Attention", "Linear Algebra", "Interactive"],
    componentId: "AttentionVisualizer",
  },
  {
    title: "Subword Tokenizer & Byte-Pair Encoding Sandbox",
    slug: "tokenizer-explorer",
    description:
      "Live interactive tokenizer showing token boundaries, token IDs, byte lengths, and tokenization efficiency metrics on user-provided text.",
    category: "GenAI" as const,
    date: "2026-07-20",
    status: "Interactive" as const,
    tags: ["BPE", "Tokenization", "LLM Inference", "Compression"],
    componentId: "TokenizerExplorer",
  },
  {
    title: "High-Dimensional Vector Cosine Similarity Lab",
    slug: "vector-similarity-lab",
    description:
      "Explore 2D and high-dimensional semantic vector projections, cosine similarity thresholds, dot products, and Euclidean distances with interactive point adjustments.",
    category: "Embeddings" as const,
    date: "2026-06-10",
    status: "Interactive" as const,
    tags: ["Embeddings", "Vector Search", "Math", "Cosine Distance"],
    componentId: "VectorSimilarityLab",
  },
];
