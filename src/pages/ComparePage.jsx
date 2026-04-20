import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { appCopy } from "../content/copy";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/formatters";
import ComparisonTable from "../components/cars/ComparisonTable";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import SectionCard from "../components/common/SectionCard";
import AppShell from "../components/layout/AppShell";

export default function ComparePage() {
  const navigate = useNavigate();
  const { cars, loadingCars } = useApp();

  const bestOption = useMemo(() => {
    return [...cars].sort((a, b) => b.insights.trustScore - a.insights.trustScore)[0] || null;
  }, [cars]);

  return (
    <AppShell
      title={appCopy.compare.title}
      subtitle={appCopy.compare.subtitle}
      action={<Button onClick={() => navigate("/cars/new")}>{appCopy.compare.addAction}</Button>}
    >
      {loadingCars ? (
        <Loader label={appCopy.dashboard.loading} />
      ) : cars.length === 0 ? (
        <SectionCard>
          <EmptyState
            title={appCopy.compare.empty.title}
            message={appCopy.compare.empty.message}
            actionLabel={appCopy.compare.empty.action}
            onAction={() => navigate("/cars/new")}
          />
        </SectionCard>
      ) : (
        <div className="grid gap-6">
          {bestOption ? (
            <SectionCard>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="app-eyebrow">{appCopy.compare.bestEyebrow}</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                    {bestOption.year} {bestOption.brand} {bestOption.model}
                  </h2>
                </div>
                <Button variant="secondary" onClick={() => navigate(`/cars/${bestOption.id}`)}>
                  {appCopy.compare.bestAction}
                </Button>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {appCopy.compare.bestSummaryPrefix} {formatCurrency(bestOption.askingPrice)}.
              </p>
            </SectionCard>
          ) : null}

          <ComparisonTable cars={cars} />
        </div>
      )}
    </AppShell>
  );
}
