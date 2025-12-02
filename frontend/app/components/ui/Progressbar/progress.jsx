"use client";

export default function ProgressBar({ value = 0, label = "Progress" }) {
  // Clamp value to 0-100 and round for accessibility label
  const percentage = Math.min(Math.max(Math.round(value), 0), 100);

  return (
    <div
      className="progress w-full lg:max-w-[50%]"
      role="progressbar"
      aria-label={`${percentage}% ${label}`}
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        className="progress-bar transition-all duration-300"
        style={{
          width: `${percentage}%`,
          backgroundColor: "var(--color-primary)",
        }}
      ></div>
    </div>
  );
}

export function ProgressBarComponent() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <ProgressBar value={0} label="Progress" />
      <ProgressBar value={20} label="Progress" />
      <ProgressBar value={40} label="Progress" />
      <ProgressBar value={60} label="Progress" />
      <ProgressBar value={80} label="Progress" />
      <ProgressBar value={100} label="Progress" />
    </div>
  );
}
