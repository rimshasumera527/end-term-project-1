import Button from "./Button";
import { appCopy } from "../../content/copy";

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
        {appCopy.brand.shortName}
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
      <p className="max-w-xl text-sm leading-6 text-slate-500">{message}</p>
      {actionLabel ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  );
}
