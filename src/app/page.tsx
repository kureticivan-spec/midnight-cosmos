import ImageGenerator from "@/components/ImageGenerator";
import VideoGenerator from "@/components/VideoGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Creative
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              {" "}Studio AI
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ignite your imagination. Generate stunning images and videos with the power of state-of-the-art AI.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2 px-2">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
              <h3 className="text-xl font-semibold text-gray-200">Image Generation</h3>
            </div>
            <ImageGenerator />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2 px-2">
              <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-orange-500 rounded-full" />
              <h3 className="text-xl font-semibold text-gray-200">Video Generation</h3>
            </div>
            <VideoGenerator />
          </div>
        </div>
      </div>
    </main>
  );
}
