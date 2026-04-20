import { Link, useNavigate, useParams } from "react-router-dom";
import { appCopy } from "../content/copy";
import { useApp } from "../context/AppContext";
import { formatDate } from "../utils/formatters";
import ChecklistCard from "../components/cars/ChecklistCard";
import CostProjection from "../components/cars/CostProjection";
import TrustScoreCard from "../components/cars/TrustScoreCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import SectionCard from "../components/common/SectionCard";
import AppShell from "../components/layout/AppShell";

export default function CarDetailsPage() {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { getCarById, deleteCar, loadingCars } = useApp();
  const car = getCarById(carId);

  if (loadingCars) {
    return (
      <AppShell title={appCopy.details.factsTitle} subtitle={appCopy.details.coverageTitle}>
        <Loader label={appCopy.dashboard.loading} />
      </AppShell>
    );
  }

  if (!car) {
    return (
      <AppShell title={appCopy.details.missingTitle} subtitle={appCopy.details.missingMessage}>
        <SectionCard>
          <EmptyState
            title={appCopy.details.missingTitle}
            message={appCopy.details.missingMessage}
            actionLabel={appCopy.details.missingAction}
            onAction={() => navigate("/dashboard")}
          />
        </SectionCard>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={`${car.year} ${car.brand} ${car.model}`}
      subtitle={`${appCopy.details.sellerPrefix}: ${car.sellerName} | ${appCopy.details.updatedPrefix}: ${formatDate(car.updatedAt)}`}
      action={
        <div className="flex gap-2">
          <Link to="/compare">
            <Button variant="secondary">{appCopy.details.compareAction}</Button>
          </Link>
          <Link to={`/cars/${car.id}/edit`}>
            <Button variant="ghost">{appCopy.details.editAction}</Button>
          </Link>
          <Button
            variant="ghost"
            onClick={async () => {
              await deleteCar(car.id);
              navigate("/dashboard");
            }}
          >
            {appCopy.details.deleteAction}
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(320px,0.7fr)_minmax(0,1.1fr)]">
        <TrustScoreCard score={car.insights.trustScore} recommendation={car.insights.recommendation} />
        <SectionCard>
          <div className="flex flex-col gap-2">
            <div>
              <p className="app-eyebrow">{appCopy.details.factsEyebrow}</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                {appCopy.details.factsTitle}
              </h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">{appCopy.shared.labels.mileage}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                {car.mileage.toLocaleString("en-IN")} km
              </h3>
            </div>
            <div>
              <p className="text-sm text-slate-500">{appCopy.shared.labels.age}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{car.age} years</h3>
            </div>
            <div>
              <p className="text-sm text-slate-500">{appCopy.shared.labels.previousOwners}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{car.previousOwners}</h3>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <strong className="text-base text-slate-950">{appCopy.details.notesTitle}</strong>
            <p className="mt-2 text-sm leading-6 text-slate-500">{car.notes || appCopy.details.notesEmpty}</p>
          </div>
        </SectionCard>
      </div>

      <CostProjection
        maintenance={car.insights.estimatedMaintenance}
        fairValue={car.insights.fairValue}
        askingPrice={car.askingPrice}
      />

      <SectionCard>
        <div className="flex flex-col gap-2">
          <div>
            <p className="app-eyebrow">{appCopy.details.riskEyebrow}</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {appCopy.details.riskTitle}
            </h3>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(220px,0.55fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{appCopy.details.coverageTitle}</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {car.insights.verificationCoverage}%
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {car.insights.verifiedChecks} of {car.insights.totalChecks} inspection checks are verified.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <strong className="text-base text-slate-950">Risk flags</strong>
              {car.insights.riskFlags?.length ? (
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-500">
                  {car.insights.riskFlags.map((flag) => (
                    <li key={flag}>{flag}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-500">{appCopy.details.riskEmpty}</p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <strong className="text-base text-slate-950">{appCopy.details.missingChecksTitle}</strong>
              {car.insights.missingChecks?.length ? (
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-500">
                  {car.insights.missingChecks.map((flag) => (
                    <li key={flag}>{flag}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-500">All inspection checks are currently verified.</p>
              )}
            </div>
          </div>
        </div>
      </SectionCard>

      <ChecklistCard checklist={car.checklist} />
    </AppShell>
  );
}
