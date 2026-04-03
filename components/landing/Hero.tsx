"use client";

import { useEffect, useState } from "react";

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone,
  }).format(new Date());
}

export function Hero() {
  const [times, setTimes] = useState(() => ({
    cambridge: formatTime("America/New_York"),
    sanFrancisco: formatTime("America/Los_Angeles"),
  }));

  useEffect(() => {
    const updateTimes = () => {
      setTimes({
        cambridge: formatTime("America/New_York"),
        sanFrancisco: formatTime("America/Los_Angeles"),
      });
    };

    updateTimes();

    const interval = window.setInterval(updateTimes, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen px-4">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="font-sans tracking-tight font-normal text-foreground text-xl sm:text-4xl md:text-5xl lg:text-6xl">
          Run voice AI agents on any device.
        </h1>
        <p className="font-heading mt-5 max-w-2xl text-center text-sm leading-relaxed text-foreground sm:text-base md:text-lg lg:text-xl">
          Ready-made local voice agents on any stack, any device, with memory and performance handled out of the box.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-[76px] flex flex-col items-center justify-center gap-3 px-6 text-sm text-muted-foreground sm:flex-row sm:gap-8">
        <p>Cambridge, MA {times.cambridge}</p>
        <a
          href="mailto:vivien@vsqrd.com,vikram@vsqrd.com"
          className="border border-border px-3 py-1 text-muted-foreground transition-none hover:text-foreground"
        >
          Contact
        </a>
        <p>San Francisco, CA {times.sanFrancisco}</p>
      </div>
    </main>
  );
}
