import { NavLink } from "react-router-dom";
import Button from "../common/Button";
import { appCopy } from "../../content/copy";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { signout } = useAuth();

  return (
    <aside className="app-card h-fit p-5 xl:sticky xl:top-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
          {appCopy.brand.shortName}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-950">{appCopy.brand.name}</div>
          <div className="text-sm text-slate-500">{appCopy.brand.subtitle}</div>
        </div>
      </div>

      <nav className="mt-8 grid gap-2">
        {appCopy.nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition",
                isActive
                  ? "border-slate-300 bg-slate-950 text-white"
                  : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")
            }
          >
            <span className="font-medium">{item.label}</span>
            <span className="text-xs uppercase tracking-[0.18em] opacity-70">{item.hint}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-950">{appCopy.brand.subtitle}</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">{appCopy.brand.sidebarSummary}</p>
        <Button variant="secondary" fullWidth className="mt-4" onClick={signout}>
          {appCopy.shared.signOut}
        </Button>
      </div>
    </aside>
  );
}
