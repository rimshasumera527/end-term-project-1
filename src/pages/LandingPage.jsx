import { Link } from "react-router-dom";
import { appCopy } from "../content/copy";
import Button from "../components/common/Button";
import SectionCard from "../components/common/SectionCard";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="app-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
              {appCopy.brand.shortName}
            </div>
            <div>
              <div className="font-semibold text-slate-950">{appCopy.brand.name}</div>
              <div className="text-sm text-slate-500">{appCopy.brand.subtitle}</div>
            </div>
          </div>
          <Link to="/auth">
            <Button>{appCopy.landing.primaryAction}</Button>
          </Link>
        </header>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="app-card p-8 md:p-10">
            <div className="app-kicker">{appCopy.landing.kicker}</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl md:leading-[1.02]">
              {appCopy.landing.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
              {appCopy.landing.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth">
                <Button>{appCopy.landing.primaryAction}</Button>
              </Link>
              <a href="#workflow">
                <Button variant="secondary">{appCopy.landing.secondaryAction}</Button>
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {appCopy.landing.featureCards.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-base font-semibold text-slate-950">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="app-card p-8">
            <p className="app-eyebrow">{appCopy.landing.problemPanel.title}</p>
            <div className="mt-6 grid gap-4">
              {appCopy.landing.problemPanel.rows.map((row) => (
                <div key={row.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-base font-semibold text-slate-950">{row.label}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{row.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {appCopy.landing.workflowCards.map((item) => (
              <SectionCard key={item.title}>
                <p className="app-eyebrow">{appCopy.landing.workflowTitle}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{item.text}</p>
              </SectionCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
