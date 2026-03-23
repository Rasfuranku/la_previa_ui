export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-primary/20" />
        <div className="h-16 w-16 animate-pulse rounded-full border-4 border-primary border-t-transparent" />
      </div>
      <p className="mt-8 animate-pulse text-sm font-medium tracking-widest text-primary uppercase">
        Preparing for the Match...
      </p>
    </div>
  );
}
