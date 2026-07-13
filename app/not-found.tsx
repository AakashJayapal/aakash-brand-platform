import React from "react";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-[#090c0a] text-white">
      <Container className="text-center flex flex-col items-center gap-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[#52b788] px-3.5 py-1.5 rounded-full bg-[#52b788]/5 border border-[#52b788]/15">
          Error 404
        </span>
        <Heading level={1} className="font-black text-4xl sm:text-6xl tracking-tight text-white mt-2">
          Page Not Found
        </Heading>
        <p className="text-zinc-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
          The requested coordinate or project path does not exist. Explore Aakash Jayapal&apos;s digital brand homepage instead.
        </p>
        <div className="mt-4">
          <Button href="/" variant="primary">
            Return to Homepage
          </Button>
        </div>
      </Container>
    </div>
  );
}
