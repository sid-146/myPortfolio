import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://sudhanwakaveeshwar.dev"),
    title: {
        default: "Sudhanwa Kaveeshwar | AI & Data Systems Engineer",
        template: "%s | Sudhanwa Kaveeshwar",
    },
    description:
        "Personal engineering portfolio of Sudhanwa Kaveeshwar. Focus on AI Engineering, Distributed Data Systems, Low-Latency LLM Serving, and Systems Thinking.",
    keywords: [
        "Sudhanwa Kaveeshwar",
        "AI Systems",
        "Data Engineering",
        "LLM Inference",
        "Rust",
        "CUDA",
        "Apache Arrow",
        "Systems Architecture",
    ],
    authors: [{ name: "Sudhanwa Kaveeshwar" }],
    creator: "Sudhanwa Kaveeshwar",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://sudhanwakaveeshwar.dev",
        title: "Sudhanwa Kaveeshwar | AI & Data Systems Engineer",
        description:
            "Engineering portfolio focusing on AI Engineering, Distributed Data Systems, Low-Latency LLM Serving, and Systems Thinking.",
        siteName: "Sudhanwa Kaveeshwar",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sudhanwa Kaveeshwar | AI & Data Systems Engineer",
        description:
            "Engineering portfolio focusing on AI Engineering, Distributed Data Systems, and Systems Thinking.",
        creator: "@sudhanwa_k",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
        >
            <body className="min-h-screen flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-500">
                <div>
                    <Header />
                    <main>{children}</main>
                </div>
                <Footer />
            </body>
        </html>
    );
}
