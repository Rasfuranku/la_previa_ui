"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
        Something went wrong!
      </h2>
      <p className="mb-8 max-w-md text-muted">
        We encountered an unexpected error. Our team has been notified and is working on a fix.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={() => reset()} size="lg">
          Try again
        </Button>
        <Link href="/">
          <Button variant="ghost" size="lg">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
