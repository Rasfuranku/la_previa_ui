"use client";

import { BentoGrid } from "@/components/dashboard/bento-grid";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden">
      
      {/* Background Gradients/Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[100px] rounded-full opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-12 lg:py-0">
        
        {/* Left: Content */}
        <div className="flex flex-col gap-8 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Season 2026 Live
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white mb-6">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">RITUAL</span> <br />
              BEGINS.
            </h1>
            
            <p className="text-lg md:text-xl text-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              La Previa bridges the gap between street passion and high-end tech. 
              Build your squad, challenge friends, and own the pitch.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="w-full sm:w-auto gap-2 group">
              Start Your Career 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg" className="w-full sm:w-auto gap-2">
              View Demo <ChevronRight className="w-4 h-4 text-muted" />
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-8 mt-8 border-t border-white/5 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <div className="text-2xl font-bold text-white">2.5M+</div>
              <div className="text-xs text-muted uppercase tracking-wider">Managers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">$10M+</div>
              <div className="text-xs text-muted uppercase tracking-wider">Prizes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div className="text-xs text-muted uppercase tracking-wider">Rating</div>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual (Bento Grid 3D) */}
        <motion.div 
          className="relative hidden lg:block perspective-1000"
          initial={{ opacity: 0, x: 50, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: -5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <div 
            className="relative transition-transform duration-500 hover:rotate-0"
            style={{ transformStyle: "preserve-3d", transform: "rotateY(-12deg) rotateX(5deg)" }}
          >
             {/* Decorative Elements behind */}
             <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-xl -z-10" />
             
             <div className="bg-[#050505] border border-white/10 rounded-2xl p-4 shadow-2xl">
                <BentoGrid />
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}