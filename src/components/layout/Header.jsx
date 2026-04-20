import { appCopy } from "../../content/copy";
import { useAuth } from "../../context/AuthContext";

export default function Header({ title, subtitle, action, search, setSearch }) {
  const { user } = useAuth();

  return (
    <header className="app-card flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <div className="app-kicker">{appCopy.brand.subtitle}</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-3 lg:min-w-[380px] lg:items-end">
        {typeof setSearch === "function" ? (
          <label className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
            <svg className="h-4 w-4 flex-none" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M8.75 15A6.25 6.25 0 1 0 8.75 2.5a6.25 6.25 0 0 0 0 12.5ZM17.5 17.5l-4.4-4.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={appCopy.shared.searchPlaceholder}
            />
          </label>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {action}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
              {(user?.displayName || "B").slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-950">
                {user?.displayName || appCopy.shared.fallbackBuyerName}
              </div>
              <span className="text-xs font-medium text-slate-500">
                {user?.providerId === "supabase"
                  ? appCopy.shared.syncLabels.supabase
                  : appCopy.shared.syncLabels.local}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
