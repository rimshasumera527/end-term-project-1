import { appCopy } from "../content/copy";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { isSupabaseConfigured } from "../services/supabase";
import Badge from "../components/common/Badge";
import SectionCard from "../components/common/SectionCard";
import AppShell from "../components/layout/AppShell";

export default function ProfilePage() {
  const { user } = useAuth();
  const { cars } = useApp();

  return (
    <AppShell title={appCopy.account.title} subtitle={appCopy.account.subtitle}>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
        <SectionCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="app-eyebrow">{appCopy.account.profileEyebrow}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                {user?.displayName || appCopy.account.profileTitle}
              </h2>
            </div>
            <Badge tone={isSupabaseConfigured ? "success" : "warning"}>
              {isSupabaseConfigured ? appCopy.shared.syncLabels.supabase : appCopy.shared.syncLabels.local}
            </Badge>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <strong className="text-base text-slate-950">{appCopy.account.labels.email}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-500">{user?.email}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <strong className="text-base text-slate-950">{appCopy.account.labels.savedReports}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-500">{cars.length} {appCopy.account.reportCountSuffix}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <strong className="text-base text-slate-950">{appCopy.account.labels.persistence}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {isSupabaseConfigured
                  ? appCopy.account.persistenceText.supabase
                  : appCopy.account.persistenceText.local}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex flex-col gap-2">
            <div>
              <p className="app-eyebrow">{appCopy.account.storageEyebrow}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                {appCopy.account.storageTitle}
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <strong className="text-base text-slate-950">{appCopy.account.labels.syncStatus}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {isSupabaseConfigured ? appCopy.account.syncText.supabase : appCopy.account.syncText.local}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <strong className="text-base text-slate-950">{appCopy.account.schemaTitle}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-500">{appCopy.account.schemaText}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <strong className="text-base text-slate-950">{appCopy.account.confirmationTitle}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-500">{appCopy.account.confirmationText}</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
