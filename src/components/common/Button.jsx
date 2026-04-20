export default function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  fullWidth = false,
  ...props
}) {
  const styles = {
    primary:
      "bg-slate-950 text-white hover:bg-slate-800 focus-visible:ring-slate-300",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-200",
    ghost:
      "border border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-200",
    danger:
      "bg-rose-600 text-white hover:bg-rose-500 focus-visible:ring-rose-200",
  };

  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant] || styles.primary,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
