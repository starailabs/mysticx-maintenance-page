import { Countdown } from "./countdown";

function Stars() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: `${(i * 0.3) % 5}s`,
    duration: `${2 + (i % 4)}s`,
    size: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
  }));

  return (
    <>
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="animate-pulse-glow absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-800/30" />
      <div
        className="animate-pulse-glow absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-indigo-700/20"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="animate-pulse-glow absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-violet-600/15"
        style={{ animationDelay: "3s" }}
      />

      {/* Stars */}
      <Stars />

      {/* Main content */}
      <main className="animate-fade-in-up relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 text-center">
        {/* Crystal ball / mystical icon */}
        <div className="animate-float relative mb-8">
          <div className="animate-spin-slow absolute -inset-4 rounded-full border border-purple-500/20" />
          <div className="absolute -inset-8 rounded-full border border-purple-500/10" />
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-purple-600/30 to-indigo-600/30 backdrop-blur-sm border border-purple-400/20 shadow-[0_0_60px_rgba(147,51,234,0.3)]">
            <svg
              viewBox="0 0 24 24"
              className="h-10 w-10 text-purple-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-purple-50 sm:text-4xl">
          Under Maintenance
        </h1>

        {/* Subtitle */}
        <p className="mb-2 text-lg text-purple-200/70">
          The stars are realigning.
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-purple-300/50">
          We&apos;re performing some mystical upgrades to enhance your experience.
          The veil will lift shortly.
        </p>

        {/* Countdown */}
        <Countdown />

        {/* Footer hint */}
        <div className="mt-12 flex items-center gap-2 text-purple-400/30 text-xs">
          <div className="h-px w-8 bg-purple-400/20" />
          <span>mysticx.ai</span>
          <div className="h-px w-8 bg-purple-400/20" />
        </div>
      </main>
    </div>
  );
}
