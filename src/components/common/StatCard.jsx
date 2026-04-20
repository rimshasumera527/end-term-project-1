import Badge from "./Badge";

export default function StatCard({ label, value, detail, tone = "neutral" }) {
  return (
    <div className="app-card p-5">
      <Badge tone={tone}>{label}</Badge>
      <div className="mt-4 text-3xl font-bold tracking-tight text-slate-950">{value}</div>
      <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
    </div>
  );
}
