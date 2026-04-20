import { startTransition, useCallback, useDeferredValue, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appCopy } from "../content/copy";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/formatters";
import AppShell from "../components/layout/AppShell";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import SectionCard from "../components/common/SectionCard";
import StatCard from "../components/common/StatCard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { cars, loadingCars, deleteCar } = useApp();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const handleSearchChange = useCallback((value) => {
    startTransition(() => {
      setSearch(value);
    });
  }, []);

  const filteredCars = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) {
      return cars;
    }

    return cars.filter((car) =>
      [car.brand, car.model, car.sellerName, car.insights?.recommendation?.label, car.notes]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [cars, deferredSearch]);

  const metrics = useMemo(() => {
    const totalInventory = cars.length;
    const bestCar = [...cars].sort((a, b) => b.insights.trustScore - a.insights.trustScore)[0] || null;
    const maintenanceExposure = cars.reduce((sum, car) => sum + Number(car.insights?.estimatedMaintenance || 0), 0);
    const comparisonReady = totalInventory >= 2;

    return {
      totalInventory,
      bestCar,
      maintenanceExposure,
      comparisonReady,
      comparisonText: comparisonReady ? `${totalInventory} reports ready` : appCopy.dashboard.comparisonFallback,
    };
  }, [cars]);

  return (
    <AppShell
      title={appCopy.dashboard.title}
      subtitle={appCopy.dashboard.subtitle}
      search={search}
      setSearch={handleSearchChange}
      action={
        <Link to="/cars/new">
          <Button>{appCopy.dashboard.primaryAction}</Button>
        </Link>
      }
    >
      {loadingCars ? (
        <Loader label={appCopy.dashboard.loading} />
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label={appCopy.dashboard.metrics.savedCars.label}
              value={metrics.totalInventory}
              detail={appCopy.dashboard.metrics.savedCars.detail}
            />
            <StatCard
              label={appCopy.dashboard.metrics.bestScore.label}
              value={metrics.bestCar ? metrics.bestCar.insights.trustScore : "0"}
              detail={
                metrics.bestCar
                  ? `${metrics.bestCar.year} ${metrics.bestCar.brand} ${metrics.bestCar.model}`
                  : appCopy.dashboard.metrics.bestScore.detail
              }
              tone={metrics.bestCar ? metrics.bestCar.insights.recommendation.tone : "neutral"}
            />
            <StatCard
              label={appCopy.dashboard.metrics.maintenanceExposure.label}
              value={formatCurrency(metrics.maintenanceExposure)}
              detail={appCopy.dashboard.metrics.maintenanceExposure.detail}
              tone={metrics.maintenanceExposure > 200000 ? "warning" : "neutral"}
            />
            <StatCard
              label={appCopy.dashboard.metrics.comparisonReady.label}
              value={metrics.comparisonText}
              detail={appCopy.dashboard.metrics.comparisonReady.detail}
              tone={metrics.comparisonReady ? "success" : "warning"}
            />
          </div>

          <SectionCard>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="app-eyebrow">{appCopy.dashboard.listEyebrow}</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                  {appCopy.dashboard.listTitle}
                </h2>
              </div>
              <Link to="/compare">
                <Button variant="secondary">{appCopy.dashboard.compareAction}</Button>
              </Link>
            </div>

            {filteredCars.length === 0 ? (
              <div className="mt-6">
                <EmptyState
                  title={appCopy.dashboard.empty.title}
                  message={appCopy.dashboard.empty.message}
                  actionLabel={appCopy.dashboard.empty.action}
                  onAction={() => navigate("/cars/new")}
                />
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                {filteredCars.map((car) => (
                  <div key={car.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                      <div className="min-w-0">
                        <h4 className="text-lg font-semibold tracking-tight text-slate-950">
                          {car.year} {car.brand} {car.model}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500">
                          {appCopy.dashboard.rowLabels.seller}: {car.sellerName}
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3 xl:min-w-[420px]">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {appCopy.dashboard.rowLabels.price}
                          </div>
                          <div className="mt-2 text-sm font-semibold text-slate-950">
                            {formatCurrency(car.askingPrice)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {appCopy.dashboard.rowLabels.trustScore}
                          </div>
                          <div className="mt-2 text-sm font-semibold text-slate-950">
                            {car.insights.trustScore}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {appCopy.dashboard.rowLabels.coverage}
                          </div>
                          <div className="mt-2 flex flex-col gap-2">
                            <Badge tone={car.insights.recommendation.tone}>
                              {car.insights.recommendation.label}
                            </Badge>
                            <span className="text-sm text-slate-600">
                              {car.insights.verificationCoverage}% verified
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link to={`/cars/${car.id}`}>
                          <Button variant="secondary">{appCopy.dashboard.actions.open}</Button>
                        </Link>
                        <Link to={`/cars/${car.id}/edit`}>
                          <Button variant="ghost">{appCopy.dashboard.actions.edit}</Button>
                        </Link>
                        <Button variant="ghost" onClick={() => deleteCar(car.id)}>
                          {appCopy.dashboard.actions.delete}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      )}
    </AppShell>
  );
}
