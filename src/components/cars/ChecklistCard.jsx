import { appCopy, inspectionChecklist } from "../../content/copy";
import SectionCard from "../common/SectionCard";

export default function ChecklistCard({ checklist }) {
  return (
    <SectionCard>
      <div className="flex flex-col gap-2">
        <div>
          <p className="app-eyebrow">{appCopy.details.checklistEyebrow}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {appCopy.details.checklistTitle}
          </h3>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {inspectionChecklist.map(({ key, label, detail }) => (
          <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-950">{label}</div>
                <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
              </div>
              <strong className="text-sm text-slate-700">
                {checklist?.[key] ? appCopy.form.checklistState.checked : appCopy.form.checklistState.pending}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
