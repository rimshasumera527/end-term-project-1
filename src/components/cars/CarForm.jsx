import { useMemo, useRef, useState } from "react";
import { appCopy, inspectionChecklist } from "../../content/copy";
import { formatCurrency } from "../../utils/formatters";
import { createCarInsights } from "../../utils/scoring";
import Badge from "../common/Badge";
import Button from "../common/Button";

const defaultForm = {
  brand: "",
  model: "",
  year: new Date().getFullYear() - 5,
  mileage: 45000,
  age: 5,
  askingPrice: 650000,
  condition: "good",
  previousOwners: 1,
  sellerName: "",
  notes: "",
  checklist: Object.fromEntries(inspectionChecklist.map(({ key }) => [key, false])),
};

export default function CarForm({ initialValues, onSave, saving, mode = "create" }) {
  const [form, setForm] = useState(initialValues || defaultForm);
  const [error, setError] = useState("");
  const notesRef = useRef(null);

  const preview = useMemo(() => createCarInsights(form), [form]);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateChecklist(key) {
    setForm((current) => ({
      ...current,
      checklist: {
        ...current.checklist,
        [key]: !current.checklist[key],
      },
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.brand || !form.model || !form.sellerName) {
      setError(appCopy.form.requiredError);
      notesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setError("");
    await onSave(form);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
      <form className="app-card grid gap-6 p-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="app-eyebrow">{appCopy.form.formEyebrow}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {mode === "edit" ? appCopy.form.editTitle : appCopy.form.formTitle}
            </h2>
          </div>
          <Badge tone={preview.recommendation.tone}>{preview.recommendation.label}</Badge>
        </div>

        <section>
          <p className="app-eyebrow">{appCopy.form.identityTitle}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="app-label">{appCopy.form.fieldLabels.brand}</label>
              <input
                className="app-input"
                value={form.brand}
                onChange={(e) => updateField("brand", e.target.value)}
                placeholder={appCopy.form.placeholders.brand}
              />
            </div>
            <div>
              <label className="app-label">{appCopy.form.fieldLabels.model}</label>
              <input
                className="app-input"
                value={form.model}
                onChange={(e) => updateField("model", e.target.value)}
                placeholder={appCopy.form.placeholders.model}
              />
            </div>
            <div>
              <label className="app-label">{appCopy.form.fieldLabels.year}</label>
              <input
                className="app-input"
                type="number"
                value={form.year}
                onChange={(e) => updateField("year", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="app-label">{appCopy.form.fieldLabels.age}</label>
              <input
                className="app-input"
                type="number"
                value={form.age}
                onChange={(e) => updateField("age", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="app-label">{appCopy.form.fieldLabels.mileage}</label>
              <input
                className="app-input"
                type="number"
                value={form.mileage}
                onChange={(e) => updateField("mileage", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="app-label">{appCopy.form.fieldLabels.askingPrice}</label>
              <input
                className="app-input"
                type="number"
                value={form.askingPrice}
                onChange={(e) => updateField("askingPrice", Number(e.target.value))}
              />
            </div>
          </div>
        </section>

        <section>
          <p className="app-eyebrow">{appCopy.form.ownershipTitle}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="app-label">{appCopy.form.fieldLabels.condition}</label>
              <select
                className="app-input"
                value={form.condition}
                onChange={(e) => updateField("condition", e.target.value)}
              >
                {appCopy.form.conditionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="app-label">{appCopy.form.fieldLabels.previousOwners}</label>
              <input
                className="app-input"
                type="number"
                value={form.previousOwners}
                onChange={(e) => updateField("previousOwners", Number(e.target.value))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="app-label">{appCopy.form.fieldLabels.sellerName}</label>
              <input
                className="app-input"
                value={form.sellerName}
                onChange={(e) => updateField("sellerName", e.target.value)}
                placeholder={appCopy.form.placeholders.sellerName}
              />
            </div>
          </div>
        </section>

        <section ref={notesRef}>
          <p className="app-eyebrow">{appCopy.form.notesTitle}</p>
          <div className="mt-4">
            <label className="app-label">{appCopy.form.fieldLabels.notes}</label>
            <textarea
              className="app-input min-h-32 resize-y"
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder={appCopy.form.notesPlaceholder}
            />
          </div>
        </section>

        <section>
          <p className="app-eyebrow">{appCopy.form.checklistEyebrow}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {appCopy.form.checklistTitle}
          </h3>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {inspectionChecklist.map(({ key, label, detail }) => (
              <button
                key={key}
                type="button"
                className={[
                  "rounded-2xl border p-4 text-left transition",
                  form.checklist[key]
                    ? "border-slate-900 bg-slate-950 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300",
                ].join(" ")}
                onClick={() => updateChecklist(key)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{label}</div>
                    <p className={["mt-2 text-sm leading-6", form.checklist[key] ? "text-slate-300" : "text-slate-500"].join(" ")}>
                      {detail}
                    </p>
                  </div>
                  <strong className="shrink-0 text-xs uppercase tracking-[0.18em]">
                    {form.checklist[key]
                      ? appCopy.form.checklistState.checked
                      : appCopy.form.checklistState.pending}
                  </strong>
                </div>
              </button>
            ))}
          </div>
        </section>

        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{saving ? appCopy.form.helperSaving : appCopy.form.helperReady}</span>
          <span>{preview.recommendation.label}</span>
        </div>

        <Button type="submit">
          {mode === "edit"
            ? saving
              ? appCopy.form.updateSaving
              : appCopy.form.update
            : saving
              ? appCopy.form.submitSaving
              : appCopy.form.submit}
        </Button>
      </form>

      <div className="app-card grid gap-6 p-6">
        <div className="flex flex-col gap-2">
          <div>
            <p className="app-eyebrow">{appCopy.form.previewEyebrow}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {appCopy.form.previewTitle}
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">{appCopy.shared.labels.trustScore}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{preview.trustScore}</h2>
          </div>
          <div>
            <p className="text-sm text-slate-500">{appCopy.shared.labels.fairValue}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {formatCurrency(preview.fairValue)}
            </h2>
          </div>
          <div>
            <p className="text-sm text-slate-500">{appCopy.shared.labels.maintenance}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {formatCurrency(preview.estimatedMaintenance)}
            </h2>
          </div>
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{appCopy.form.coverageLabel}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                {preview.verificationCoverage}% ({preview.verifiedChecks}/{preview.totalChecks} checks)
              </h3>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <strong className="text-base text-slate-950">{appCopy.form.decisionQuestion}</strong>
            <p className="mt-2 text-sm leading-6 text-slate-500">{preview.recommendation.summary}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <strong className="text-base text-slate-950">{appCopy.form.negotiationTitle}</strong>
            <p className="mt-2 text-sm leading-6 text-slate-500">{appCopy.form.negotiationText}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <strong className="text-base text-slate-950">{appCopy.form.maintenanceTitle}</strong>
            <p className="mt-2 text-sm leading-6 text-slate-500">{appCopy.form.maintenanceText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
