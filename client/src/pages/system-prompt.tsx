import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SystemPromptEditor from "@/components/system-prompt-editor";

export default function SystemPrompt() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SystemPromptEditor />
      </main>
      <Footer />
    </div>
  );
}
