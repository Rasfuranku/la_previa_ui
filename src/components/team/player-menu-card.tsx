'use client';

import { PlayerResponse } from '@/lib/schemas/player.schema';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, AlertTriangle, ShieldCheck, Activity, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

interface PlayerMenuCardProps {
  player: PlayerResponse;
  onClose: () => void;
  onRemove: (playerId: number) => void;
}

export function PlayerMenuCard({ player, onClose, onRemove }: PlayerMenuCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Sliding Panel */}
        <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col pt-12 overflow-y-auto"
        >
          <Button 
            variant="glass" 
            size="icon" 
            onClick={onClose}
            className="absolute top-6 left-6 rounded-full w-10 h-10 border-white/10"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Header Info */}
          <div className="flex flex-col items-center px-6 mt-8">
            <div className="w-32 h-32 rounded-3xl bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden mb-6 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                {player.picture ? (
                    <img src={player.picture} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-4xl">⚽</span>
                )}
            </div>
            <h2 className="text-3xl font-black text-white text-center leading-tight mb-1">{player.name} {player.last_name}</h2>
            <div className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
                {player.current_team_name || player.current_team}
            </div>
            <div className="flex gap-2 items-center text-sm font-bold uppercase tracking-wider text-primary">
                {player.position_id === 1 && "Goalkeeper"}
                {player.position_id === 2 && "Defender"}
                {player.position_id === 3 && "Midfielder"}
                {player.position_id === 4 && "Forward"}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 px-6 mt-10">
              <div className="glass-panel p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider mb-2 flex items-center gap-2"><TrendingUp className="w-3 h-3"/> Form</span>
                  <span className="text-3xl font-black text-white">{player.form}</span>
              </div>
              <div className="glass-panel p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider mb-2 flex items-center gap-2"><Activity className="w-3 h-3"/> Total Pts</span>
                  <span className="text-3xl font-black text-white">{player.total_points}</span>
              </div>
              <div className="glass-panel p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center col-span-2">
                  <span className="text-xs text-muted uppercase font-bold tracking-wider mb-2 flex items-center gap-2"><ShieldCheck className="w-3 h-3"/> Market Value</span>
                  <span className="text-4xl font-black text-green-400">${(player.price / 1000000).toFixed(1)}M</span>
              </div>
          </div>

          {/* Additional Info */}
          <div className="px-6 mt-8 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-muted font-medium">Status</span>
                  <span className="text-sm text-white font-bold">{player.status === 'a' ? 'Available' : 'Unavailable'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-muted font-medium">Selected By</span>
                  <span className="text-sm text-white font-bold">{player.selected_by_percent}%</span>
              </div>
          </div>

          <div className="flex-1" />

          {/* Actions */}
          <div className="p-6 mt-10 bg-gradient-to-t from-black to-transparent space-y-3">
              <Link href={`/players/${player.id}`} className="w-full">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full gap-2 mb-2"
                  >
                        <User className="w-5 h-5" />
                        View Full Profile
                  </Button>
              </Link>

              {!showConfirm ? (
                  <Button 
                    variant="glass" 
                    size="lg" 
                    className="w-full gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    onClick={() => setShowConfirm(true)}
                  >
                        <LogOut className="w-5 h-5" />
                        Sell / Substitute Player
                  </Button>
              ) : (
                  <div className="space-y-3 glass-panel p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-2">
                          <AlertTriangle className="w-4 h-4" />
                          Confirm Action
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                          Are you sure you want to remove this player from your squad? You will regain their market value.
                      </p>
                      <div className="flex gap-2 pt-2">
                          <Button 
                            variant="glass" 
                            className="flex-1 border-white/10 text-xs" 
                            onClick={() => setShowConfirm(false)}
                          >
                              Cancel
                          </Button>
                          <Button 
                            variant="primary" 
                            className="flex-1 bg-red-600 hover:bg-red-700 text-xs" 
                            onClick={() => {
                                onRemove(player.id);
                                onClose();
                            }}
                          >
                              Confirm
                          </Button>
                      </div>
                  </div>
              )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
