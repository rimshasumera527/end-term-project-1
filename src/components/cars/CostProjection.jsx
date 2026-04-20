import { appCopy } from "../../content/copy";
import { formatCurrency } from "../../utils/formatters";
import SectionCard from "../common/SectionCard";

export default function CostProjection({ maintenance, fairValue, askingPrice }) {
  return (
    <SectionCard>
      <div className="flex flex-col gap-2">
        <div>
          <p className="app-eyebrow">{appCopy.details.costEyebrow}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {appCopy.details.costTitle}
          </h3>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-sm text-slate-500">{appCopy.shared.labels.askingPrice}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {formatCurrency(askingPrice)}
          </h3>
        </div>
        <div>
          <p className="text-sm text-slate-500">{appCopy.shared.labels.maintenance}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {formatCurrency(maintenance)}
          </h3>
        </div>
        <div>
          <p className="text-sm text-slate-500">{appCopy.shared.labels.fairValue}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {formatCurrency(fairValue)}
          </h3>
        </div>
      </div>
    </SectionCard>
  );
}
