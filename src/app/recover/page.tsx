'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Logo } from "@/components/ui/logo";

const RecoverSchema = z.object({
  email: z.string().email("Invalid email address"),
});
type RecoverInput = z.infer<typeof RecoverSchema>;

export default function RecoverPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoverInput>({
    resolver: zodResolver(RecoverSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: RecoverInput) => {
    setServerError(null);
    setSuccessMessage(null);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
      const res = await fetch(`${API_URL}/auth/recover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      
      if (!res.ok) {
        setServerError("Failed to request password reset. Try again.");
        return;
      }
      
      const body = await res.json();
      setSuccessMessage(body.message || "Recovery email sent.");
    } catch (err) {
      setServerError("Service unavailable.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to login
        </Link>

        <div className="glass-panel p-8 rounded-3xl space-y-8 border border-white/10 bg-black/40 backdrop-blur-md">
          <div className="text-center">
            <Logo className="justify-center mb-2" />
            <h1 className="text-2xl font-bold text-white">Recover Password</h1>
            <p className="text-muted text-sm">Enter your email and we'll send a reset link.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {successMessage && (
              <div className="flex items-center gap-2 p-3 text-sm text-green-500 bg-green-500/10 rounded-md border border-green-500/20">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {serverError && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted px-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="name@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500 px-1">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting || !!successMessage}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Recovery Link'
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
