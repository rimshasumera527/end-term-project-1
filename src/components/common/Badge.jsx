export default function Badge({ children, tone = "neutral" }) {
  const tones = {
    success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border border-amber-200 bg-amber-50 text-amber-700",
    danger: "border border-rose-200 bg-rose-50 text-rose-700",
    neutral: "border border-slate-200 bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone] || tones.neutral,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
