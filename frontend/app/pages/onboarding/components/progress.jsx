"use client";

export default function ProgressBar({ value = 0, label = "Progress" }) {
  // Ensure value is between 0 and 100
  const percentage = Math.min(Math.max(value, 0), 100);

  // Map percentage to Tailwind width classes
  const widthClasses = {
    0: "w-0",
    25: "w-1/4",
    50: "w-1/2",
    75: "w-3/4",
    100: "w-full",
  };

  // Find closest available width class
  const getWidthClass = (val) => {
    if (val <= 0) return "w-0";
    if (val <= 25) return "w-1/4";
    if (val <= 50) return "w-1/2";
    if (val <= 75) return "w-3/4";
    return "w-full";
  };

  const widthClass = getWidthClass(percentage);

  return (
    <div
      className="progress w-56"
      role="progressbar"
      aria-label={`${percentage}% ${label}`}
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div className={`progress-bar ${widthClass}`}></div>
    </div>
  );
}

export function ProgressBarComponent() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <ProgressBar value={0} label="Progressbar" />
      <ProgressBar value={25} label="Progressbar" />
      <ProgressBar value={50} label="Progressbar" />
      <ProgressBar value={75} label="Progressbar" />
      <ProgressBar value={100} label="Progressbar" />
    </div>
  );
}
