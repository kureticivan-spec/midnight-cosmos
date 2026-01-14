"use client";

import { useState } from "react";

export default function VideoGenerator() {
    const [prompt, setPrompt] = useState("");
    const [video, setVideo] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateVideo = async () => {
        if (!prompt) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/generate-video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate video");
            }

            const data = await response.json();
            setVideo(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-orange-600 bg-clip-text text-transparent">
                    AI Video Generator
                </h2>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the video regarding..."
                        className="flex-1 px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-white/40 transition-all"
                        onKeyDown={(e) => e.key === "Enter" && generateVideo()}
                    />
                    <button
                        onClick={generateVideo}
                        disabled={loading || !prompt}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-600 hover:to-orange-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-500/20"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Generating...
                            </span>
                        ) : (
                            "Generate"
                        )}
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <div className="aspect-video w-full bg-black/20 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center relative">
                    {video ? (
                        <video
                            src={video}
                            controls
                            autoPlay
                            loop
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white/20"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <p className="text-white/40 text-sm">
                                Your generated video will appear here
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
