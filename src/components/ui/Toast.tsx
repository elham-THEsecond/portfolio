'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastOptions {
  title: string;
  description?: string;
  type?: 'success' | 'info';
  duration?: number;
}

interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...options, id }]);

    const duration = options.duration || 3200;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Render Anchor */}
      <div
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none"
        aria-live="polite"
        role="region"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: 'spring', damping: 24, stiffness: 350 }}
              className="pointer-events-auto glass-panel p-4 rounded-xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_12px_rgba(34,211,238,0.2)] flex items-start gap-3 bg-[#0e0e14]/90 backdrop-blur-2xl"
            >
              <div className="mt-0.5 shrink-0">
                {t.type === 'info' ? (
                  <Info className="w-4 h-4 text-cyan-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="text-sm font-semibold text-zinc-100 font-sans">{t.title}</div>
                {t.description && (
                  <div className="text-xs text-zinc-400 font-mono">{t.description}</div>
                )}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
