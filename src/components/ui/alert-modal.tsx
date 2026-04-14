'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export function AlertModal({ isOpen, title = "Attention", message, onClose }: AlertModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
            className="relative w-full max-w-sm overflow-hidden"
          >
            <div className="glass-panel p-6 rounded-3xl bg-black/80 border border-white/10 shadow-[0_0_40px_rgba(239,68,68,0.15)] flex flex-col gap-6">
                
                {/* Header Graphic */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed font-medium">
                            {message}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <Button 
                    variant="glass" 
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-bold tracking-wider" 
                    onClick={onClose}
                >
                    Acknowledge
                </Button>
                
                {/* Close X */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
