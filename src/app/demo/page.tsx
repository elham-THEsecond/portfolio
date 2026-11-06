import type { Metadata } from 'next';
import Link from 'next/link';
import DemoOne from '@/components/ui/demo';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WebGL Shader Demo | Elham Portfolio',
  description: 'Interactive WebGL chromatic aberration shader with liquid glass button.',
};

export default function DemoPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col justify-center">
      {/* Return to Portfolio Floating Pill */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* Demo Container */}
      <div className="w-full relative z-10 px-4 py-16">
        <DemoOne />
      </div>
    </div>
  );
}
