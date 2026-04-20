import { appCopy } from "../../content/copy";
import Badge from "../common/Badge";

export default function TrustScoreCard({ score, recommendation }) {
  return (
    <div className="app-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="app-eyebrow">{appCopy.details.trustEyebrow}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {appCopy.details.trustTitle}
          </h3>
        </div>
        <Badge tone={recommendation.tone}>{recommendation.label}</Badge>
      </div>

      <div className="mt-8 grid gap-3">
        <strong className="text-6xl font-bold leading-none tracking-tight text-slate-950">{score}</strong>
        <p className="max-w-xl text-sm leading-6 text-slate-500">{recommendation.summary}</p>
      </div>
    </div>
  );
}
