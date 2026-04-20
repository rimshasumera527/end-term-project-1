import { appCopy } from "../../content/copy";
import { formatCurrency } from "../../utils/formatters";
import Badge from "../common/Badge";
import SectionCard from "../common/SectionCard";

export default function ComparisonTable({ cars }) {
  return (
    <SectionCard>
      <div className="flex flex-col gap-2">
        <div>
          <p className="app-eyebrow">{appCopy.compare.tableEyebrow}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {appCopy.compare.tableTitle}
          </h3>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {appCopy.compare.tableHeaders.map((header) => (
                <th key={header} className="border-b border-slate-200 px-4 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="border-b border-slate-200 px-4 py-4">
                  <strong className="text-sm text-slate-950">{car.year} {car.brand} {car.model}</strong>
                </td>
                <td className="border-b border-slate-200 px-4 py-4 text-sm text-slate-600">{car.sellerName}</td>
                <td className="border-b border-slate-200 px-4 py-4 text-sm text-slate-600">
                  {formatCurrency(car.askingPrice)}
                </td>
                <td className="border-b border-slate-200 px-4 py-4 text-sm font-semibold text-slate-950">
                  {car.insights.trustScore}
                </td>
                <td className="border-b border-slate-200 px-4 py-4 text-sm text-slate-600">
                  {formatCurrency(car.insights.estimatedMaintenance)}
                </td>
                <td className="border-b border-slate-200 px-4 py-4">
                  <Badge tone={car.insights.recommendation.tone}>
                    {car.insights.recommendation.label}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
