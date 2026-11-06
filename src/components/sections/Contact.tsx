'use client';

import React, { useState } from 'react';
import { SOCIAL_LINKS } from '@/lib/lab-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Send,
  Sparkles,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const email = 'elham@example.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast({
      title: 'Email Copied to Clipboard',
      description: email,
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2400);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'x':
        return <Twitter className="w-4 h-4" />;
      case 'resume':
        return <FileText className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Channels"
      className="relative pt-24 pb-16 px-6 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Contact Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <Badge variant="pill" className="mx-auto">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            Direct Communication Channels
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
            Let’s build something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              exceptionally fluid.
            </span>
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed">
            Available for principal/lead mobile engineering, performance consulting, custom Impeller
            shader systems, or strategic Flutter architecture advisory.
          </p>
        </div>

        {/* Terminal Command Palette Contact Block */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-[0_24px_64px_-16px_rgba(0,0,0,0.8)] mb-14">
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 bg-black/60 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono text-zinc-400 ml-2">contact.sh</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available 2025</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 space-y-6 font-mono text-sm">
            {/* Terminal Command */}
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-zinc-100">curl -s https://elham.dev/contact.json</span>
            </div>

            {/* Formatted JSON Output */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/5 text-xs sm:text-sm text-zinc-300 space-y-1.5 overflow-x-auto">
              <div className="text-zinc-500">&#123;</div>
              <div className="pl-4">
                <span className="text-cyan-400">&quot;name&quot;</span>: &quot;Elham&quot;,
              </div>
              <div className="pl-4">
                <span className="text-cyan-400">&quot;role&quot;</span>: &quot;Lead Flutter &
                Mobile Systems Engineer&quot;,
              </div>
              <div className="pl-4">
                <span className="text-cyan-400">&quot;primaryStack&quot;</span>: [&quot;Flutter
                3.x&quot;, &quot;Impeller GLSL&quot;, &quot;Riverpod&quot;, &quot;BLoC&quot;,
                &quot;Dart Isolates&quot;, &quot;C++ FFI&quot;],
              </div>
              <div className="pl-4 flex items-center gap-2 flex-wrap">
                <span className="text-cyan-400">&quot;email&quot;</span>: &quot;{email}&quot;
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-cyan-300 transition-colors ml-2 cursor-pointer"
                  title="Copy email"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
              <div className="pl-4">
                <span className="text-cyan-400">&quot;status&quot;</span>: &quot;Open for high-impact
                roles&quot;,
              </div>
              <div className="pl-4">
                <span className="text-cyan-400">&quot;frameBudget&quot;</span>: &quot;Locked 60fps /
                8.2ms ProMotion 120Hz&quot;
              </div>
              <div className="text-zinc-500">&#125;</div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                href={`mailto:${email}`}
                variant="primary"
                size="md"
                icon={<Send className="w-4 h-4" />}
                iconPosition="right"
              >
                Send Email Message
              </Button>

              <Button
                onClick={handleCopyEmail}
                variant="secondary"
                size="md"
                icon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied to Clipboard' : 'Copy Email Address'}
              </Button>
            </div>
          </div>
        </div>

        {/* Social Channels Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {SOCIAL_LINKS.filter((l) => l.platform !== 'email').map((link) => (
            <Button
              key={link.platform}
              href={link.url}
              target="_blank"
              variant="outline"
              size="md"
              icon={getPlatformIcon(link.platform)}
              aria-label={`Open ${link.label} profile`}
            >
              <span>{link.label}</span>
              <span className="text-xs text-zinc-400 font-mono ml-1">{link.handle}</span>
            </Button>
          ))}
        </div>

        {/* Minimal Footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Elham • 2025 Mobile Systems Architecture</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Locked 60fps / 120Hz Standard</span>
            </span>
            <span>•</span>
            <span>Next.js 15 & Three.js R3F</span>
          </div>
        </div>
      </div>
    </section>
  );
};
