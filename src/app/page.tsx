import { AnimatedHero } from "@/components/home/animated-hero";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden">
      
      {/* Background Gradients/Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-stripe-blue/5 blur-[100px] rounded-full opacity-20 pointer-events-none" />

      <AnimatedHero />
    </div>
  );
}
