"use client";

import { useEffect, useState } from "react";

function parseEstimatedEnd(): Date | null {
  const duration = process.env.NEXT_PUBLIC_MAINTENANCE_DURATION;
  if (!duration) return null;

  const buildTime = new Date(process.env.NEXT_PUBLIC_BUILD_TIMESTAMP || Date.now());
  const match = duration.match(/^(\d+)(m|h|d)$/);
  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2];
  const ms =
    unit === "m" ? value * 60 * 1000 :
    unit === "h" ? value * 60 * 60 * 1000 :
    unit === "d" ? value * 24 * 60 * 60 * 1000 : 0;

  return new Date(buildTime.getTime() + ms);
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);
  const [expired, setExpired] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const estimatedEnd = parseEstimatedEnd();
    if (!estimatedEnd) return;

    function tick() {
      const now = Date.now();
      const diff = estimatedEnd!.getTime() - now;
      if (diff <= 0) {
        setExpired(true);
        setTimeLeft({ h: 0, m: 0, s: 0 });
        return;
      }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ h, m, s });
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <CountdownPlaceholder />;
  }

  if (!timeLeft) return null;

  if (expired) {
    return (
      <p className="text-purple-300/80 text-sm mt-6 animate-pulse">
        Maintenance should be wrapping up — check back any moment now.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <p className="text-purple-300/60 text-xs uppercase tracking-[0.25em] mb-4">
        Estimated time remaining
      </p>
      <div className="flex gap-4 justify-center">
        <TimeBlock value={timeLeft.h} label="Hours" />
        <div className="text-2xl text-purple-400/50 font-light self-start mt-2">:</div>
        <TimeBlock value={timeLeft.m} label="Minutes" />
        <div className="text-2xl text-purple-400/50 font-light self-start mt-2">:</div>
        <TimeBlock value={timeLeft.s} label="Seconds" />
      </div>
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-purple-950/40 border border-purple-500/20 rounded-lg w-16 h-16 flex items-center justify-center backdrop-blur-sm">
        <span className="text-2xl font-mono font-semibold text-purple-100 tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-purple-400/50 uppercase tracking-wider mt-1.5">
        {label}
      </span>
    </div>
  );
}

function CountdownPlaceholder() {
  return (
    <div className="mt-8">
      <p className="text-purple-300/60 text-xs uppercase tracking-[0.25em] mb-4">
        Estimated time remaining
      </p>
      <div className="flex gap-4 justify-center">
        {["Hours", "Minutes", "Seconds"].map((label, i) => (
          <div key={label} className="flex items-center gap-4">
            {i > 0 && <div className="text-2xl text-purple-400/50 font-light self-start mt-2">:</div>}
            <div className="flex flex-col items-center">
              <div className="bg-purple-950/40 border border-purple-500/20 rounded-lg w-16 h-16 flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-mono font-semibold text-purple-100/30 tabular-nums">
                  --
                </span>
              </div>
              <span className="text-[10px] text-purple-400/50 uppercase tracking-wider mt-1.5">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
