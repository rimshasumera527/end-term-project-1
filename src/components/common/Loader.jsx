export default function Loader({ fullScreen = false, label = "Loading..." }) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center gap-4 text-sm text-slate-500",
        fullScreen ? "min-h-screen" : "py-16",
      ].join(" ")}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      <span>{label}</span>
    </div>
  );
}
